const ONE_HOUR = 3600000;

export default class Graph {
  private _history: any[] = [];
  private _width: number;
  private _height: number;
  private _margin: any;
  private _points: number;
  private _hours: number;
  private _aggregateFuncName: string;
  private _calcPoint: Function;
  private _smoothing: boolean;
  private _logarithmic: boolean;
  private _groupBy: string;
  private _endTime: number = 0;
  private _startTime: number = 0;
  private _max: number = 0;
  private _min: number = 0;
  
  public coords: Array<[number, number, number]> = [];

  constructor(
    width: number, 
    height: number, 
    margin: any, 
    hours: number = 24, 
    points: number = 1, 
    aggregateFuncName: string = 'avg', 
    groupBy: string = 'interval', 
    smoothing: boolean = true, 
    logarithmic: boolean = false
  ) {
    const aggregateFuncMap: { [key: string]: Function } = {
      avg: this._average,
      median: this._median,
      max: this._maximum,
      min: this._minimum,
      first: this._first,
      last: this._last,
      sum: this._sum,
      delta: this._delta,
      diff: this._diff,
    };

    this._history = [];
    this.coords = [];
    this._width = width - margin.x * 2;
    this._height = height - margin.y * 4;
    this._margin = margin;
    this._max = 0;
    this._min = 0;
    this._points = points;
    this._hours = hours;
    this._aggregateFuncName = aggregateFuncName;
    this._calcPoint = aggregateFuncMap[aggregateFuncName] || this._average;
    this._smoothing = smoothing;
    this._logarithmic = logarithmic;
    this._groupBy = groupBy;
    this._endTime = 0;
    this._startTime = 0;
  }

  get max() { return this._max; }
  set max(max: number) { this._max = max; }

  get min() { return this._min; }
  set min(min: number) { this._min = min; }

  set history(data: any[]) { this._history = data; }

  update(history: any[] | undefined = undefined) {
    if (history) {
      this._history = history;
    }
    if (!this._history || !this._history.length) return;
    this._updateTimeRange();

    const histGroups = this._history.reduce((res: any[][], item) => this._reducer(res, item), []);

    this.coords = this._calcPointsWithTime(histGroups);
    
    const values = this.coords.map(item => Number(item[2])).filter(v => !isNaN(v));
    if (values.length > 0) {
      this._min = Math.min(...values);
      this._max = Math.max(...values);
    }
  }

  private _updateTimeRange() {
    this._endTime = new Date().getTime();
    this._startTime = this._endTime - this._hours * ONE_HOUR;
  }

  private _reducer(res: any[][], item: any): any[][] {
    const timestamp = new Date(item.last_changed).getTime();
    
    if (timestamp < this._startTime || timestamp > this._endTime) {
      return res;
    }
    
    const intervalSize = ONE_HOUR / 12; 
    const intervalIndex = Math.floor((timestamp - this._startTime) / intervalSize);
    
    if (!res[intervalIndex]) res[intervalIndex] = [];
    res[intervalIndex].push(item);
    
    return res;
  }

  private _calcPointsWithTime(groups: any[][]): Array<[number, number, number]> {
    const coords: Array<[number, number, number]> = [];
    const totalWidth = this._width;
    const timeRange = this._endTime - this._startTime;

    for (let i = 0; i < groups.length; i++) {
      if (!groups[i] || groups[i].length === 0) continue;

      const timestamps = groups[i].map((item: any) => new Date(item.last_changed).getTime());
      const avgTimestamp = timestamps.reduce((a: number, b: number) => a + b, 0) / timestamps.length;
      
      const x = ((avgTimestamp - this._startTime) / timeRange) * totalWidth + this._margin.x;
      const y = 0; 
      const value = this._calcPoint(groups[i]);
      
      coords.push([x, y, value]);
    }
    coords.sort((a, b) => a[0] - b[0]);
    
    return coords;
  }

  private _calcY(coords: Array<[number, number, number]>): Array<[number, number, number]> {
    if (coords.length === 0) return [];
    
    const max = this._logarithmic ? Math.log10(Math.max(1, this._max)) : this._max;
    const min = this._logarithmic ? Math.log10(Math.max(1, this._min)) : this._min;
    const range = max - min || 1;

    return coords.map((coord) => {
      const val = this._logarithmic ? Math.log10(Math.max(1, coord[2])) : coord[2];
      let y = this._height - ((val - min) / range) * this._height * 0.9 - this._height * 0.05 + this._margin.y * 2;
      
      if (isNaN(y)) {
        y = this._height / 2;
      }
      
      return [coord[0], Math.max(0, Math.min(this._height, y)), coord[2]];
    });
  }

  getPoints(): Array<[number, number, number, number]> {
    if (this.coords.length < 2) return [];
    
    let coords = this._calcY(this.coords);
    
    if (this._smoothing) {
      const smoothed: Array<[number, number, number, number]> = [];
      for (let i = 0; i < coords.length - 1; i++) {
        const p1 = coords[i];
        const p2 = coords[i + 1];
        const steps = 3;
        
        for (let s = 0; s < steps; s++) {
          const t = s / steps;
          const x = p1[0] + (p2[0] - p1[0]) * t;
          const y = p1[1] + (p2[1] - p1[1]) * t;
          const val = p1[2] + (p2[2] - p1[2]) * t;
          smoothed.push([x, y, val, i * steps + s]);
        }
      }
      const last = coords[coords.length - 1];
      smoothed.push([last[0], last[1], last[2], smoothed.length]);
      
      return smoothed;
    }
    
    return coords.map((point, i) => [point[0], point[1], point[2], i]);
  }

  private _average(items: any[]): number {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, entry) => (sum + parseFloat(entry.state)), 0) / items.length;
  }

  private _median(items: any[]): number {
    if (!items || items.length === 0) return 0;
    const itemsDup = [...items].sort((a, b) => parseFloat(a.state) - parseFloat(b.state));
    const mid = Math.floor((itemsDup.length - 1) / 2);
    if (itemsDup.length % 2 === 1)
      return parseFloat(itemsDup[mid].state);
    return (parseFloat(itemsDup[mid].state) + parseFloat(itemsDup[mid + 1].state)) / 2;
  }

  private _maximum(items: any[]): number {
    if (!items || items.length === 0) return 0;
    return Math.max(...items.map(item => parseFloat(item.state)));
  }

  private _minimum(items: any[]): number {
    if (!items || items.length === 0) return 0;
    return Math.min(...items.map(item => parseFloat(item.state)));
  }

  private _first(items: any[]): number {
    if (!items || items.length === 0) return 0;
    return parseFloat(items[0].state);
  }

  private _last(items: any[]): number {
    if (!items || items.length === 0) return 0;
    return parseFloat(items[items.length - 1].state);
  }

  private _sum(items: any[]): number {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, entry) => sum + parseFloat(entry.state), 0);
  }

  private _delta(items: any[]): number {
    if (!items || items.length === 0) return 0;
    return this._maximum(items) - this._minimum(items);
  }

  private _diff(items: any[]): number {
    if (!items || items.length === 0) return 0;
    return this._last(items) - this._first(items);
  }

  private _lastValue(items: any[]): number {
    if (!items || items.length === 0) return 0;
    if (['delta', 'diff'].includes(this._aggregateFuncName)) {
      return 0;
    } else {
      return parseFloat(items[items.length - 1].state) || 0;
    }
  }
}