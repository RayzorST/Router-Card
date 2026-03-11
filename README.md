### Router Card
A highly customizable Home Assistant Lovelace card for monitoring routers, access points, and mesh network devices.
[Image: Router Card Preview]
Features
🎯 Universal Compatibility - Works with any router integration that provides sensors
🔄 Controller & Repeater Support - Different badges and icons for main routers and repeaters
📊 Flexible Layout - Two display sections: card view (top) and list view (bottom)
🎨 Customizable - Choose which sensors to display, custom icons, themes
📡 WAN Status - Dedicated section for WAN connection status and IP
🌡️ Traffic Monitoring - Display network traffic for WAN, LAN, and WiFi bands
🌙 Theme Support - Default, dark, and light themes
Installation
HACS (Recommended)
Open HACS in Home Assistant
Click on "Custom Cards"
Search for "Router Card"
Click "Install"
Add the resource to your Lovelace dashboard
Manual Installation
Download router-card.js from the latest release
Place the file in /config/www/community/router-card/
Add the resource to your Lovelace dashboard:
Go to Settings → Dashboards → Resources
Click "+ Add Resource"
URL: /hacsfiles/router-card/router-card.js
Type: JavaScript Module
Configuration
Basic Configuration
yaml
12345678910111213141516171819202122232425262728293031323334
type: custom:router-card
name: Keenetic Voyager Pro
icon: mdi:router-wireless
controller: true
theme: default
wan_status_entity: sensor.keenetic_wan_status
wan_ip_entity: sensor.keenetic_wan_ip
top_sensors:
  - entity: sensor.keenetic_cpu_load
    name: CPU Load

Controller Configuration Example
[Image: Controller Card Example]
yaml
12345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152535455
type: custom:router-card
name: Keenetic Voyager Pro
icon: mdi:router-wireless
controller: true
theme: default
wan_status_entity: sensor.keenetic_voyager_wan_status
wan_ip_entity: sensor.keenetic_voyager_wan_ip
top_sensors:
  - entity: sensor.keenetic_voyager_cpu_load
    name: CPU Load

Repeater Configuration Example
[Image: Repeater Card Example]
yaml
1234567891011121314151617181920212223242526
type: custom:router-card
name: Keenetic Repeater Living Room
icon: mdi:access-point
controller: false
theme: default
top_sensors:
  - entity: sensor.keenetic_repeater_lr_cpu_load
    name: CPU Load
    unit: '%'
    show_bar: true

Multiple Routers Dashboard Example
[Image: Multiple Routers Dashboard]
yaml
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566
type: vertical-stack
cards:
  - type: custom:router-card
    name: Keenetic Voyager Pro (Main)
    icon: mdi:router-wireless
    controller: true
    wan_status_entity: sensor.keenetic_main_wan_status
    wan_ip_entity: sensor.keenetic_main_wan_ip
    top_sensors:
      - entity: sensor.keenetic_main_cpu_load

Options
Card Options
Name
Type
Default
Required
Description
type
string
Yes
custom:router-card
name
string
'Router'
No
Card title
icon
string
mdi:router-wireless
No
Custom icon for the card
controller
boolean
true
No
Set to true for main router, false for repeaters
theme
string
'default'
No
Theme: default, dark, or light
WAN Section
Name
Type
Required
Description
wan_status_entity
string
No
Entity for WAN connection status
wan_ip_entity
string
No
Entity for WAN IP address
WAN Display Logic:
If both entities exist: status shows on left, IP on right
If only one exists: it shows on the left
If none exist: WAN section is hidden
Top Sensors (Card View)
Name
Type
Required
Description
top_sensors
array
No
List of sensors to display in card view
Sensor Options:
Name
Type
Required
Description
entity
string
Yes
Entity ID
name
string
Yes
Display name
unit
string
No
Unit of measurement
icon
string
No
Icon for the sensor
show_bar
boolean
No
Show progress bar (for percentages)
Bottom Sensors (List View)
Name
Type
Required
Description
bottom_sensors
array
No
List of sensors to display in list view
Sensor Options:
Name
Type
Required
Description
entity
string
Yes
Entity ID
name
string
Yes
Display name
unit
string
No
Unit of measurement
icon
string
No
Icon for the sensor
Themes
Default Theme
[Image: Default Theme Example]
Uses Home Assistant's default theme colors.
Dark Theme
[Image: Dark Theme Example]
yaml
1
theme: dark
Light Theme
[Image: Light Theme Example]
yaml
1
GUI Configuration
Router Card includes a full-featured GUI editor for easy configuration:
[Image: GUI Editor - General Tab]
[Image: GUI Editor - WAN Tab]
[Image: GUI Editor - Top Sensors Tab]
[Image: GUI Editor - Bottom Sensors Tab]
Using the GUI Editor
Click "Edit" on the card
Navigate through tabs:
General: Card name, icon, controller mode, theme
WAN: WAN status and IP entities
Top (Cards): Add/remove sensors for card view
Bottom (List): Add/remove sensors for list view
Click "Save" to apply changes
Supported Integrations
Router Card works with any integration that provides sensor entities, including:
Keenetic Router
ASUSWRT
Mikrotik Router
OpenWRT
SNMP
Custom integrations
Common Sensor Entities
Keenetic Integration
yaml
123456789101112131415161718192021222324252627282930313233
# System
sensor.keenetic_cpu_load
sensor.keenetic_memory_usage
sensor.keenetic_uptime
sensor.keenetic_firmware_version

# WAN
sensor.keenetic_wan_status
sensor.keenetic_wan_ip
sensor.keenetic_pppoe_uptime

Troubleshooting
Card not showing up
Make sure the resource is properly added to Lovelace
Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
Check browser console for errors
Sensors not displaying
Verify entity IDs are correct
Check if entities exist in Home Assistant
Ensure entities have valid states
WAN section not showing
At least one of wan_status_entity or wan_ip_entity must be configured
Development
Building from Source
bash
12345678
# Install dependencies
npm install

# Build for production
npm run build

# Watch for changes (development)
npm run watch
Project Structure
1234567891011
router-card/
├── src/
│   ├── router-card.ts
│   └── router-card-editor.ts
├── dist/
│   └── router-card.js
├── package.json
├── rollup.config.js
├── tsconfig.json
├── hacs.json

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments
Home Assistant community
Lit library
Custom Card Helpers
