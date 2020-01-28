# MMM-IPU
A MagicMirror² Module for retrieve Air Pollutant Index (API) or in malay Indeks Pencemaran Udara (IPU)

## Installation
1. Navigate into your MagicMirror's `modules` folder
2. Execute `git clone https://github.com/putera/MMM-IPU.git`

## Using the module
To use this module, add it to the modules array in the `config/config.js` file:

```javascript
modules: [
    {
        module: "MMM-IPU",
        position: "top_left",
        header: "Indeks Pencemaran Udara (IPU)",
        config: {
            // See 'Configuration options' for more information.
            state: "Perak",
            location: "Seri Manjung"
        }
    }
]
```

## Configuration Options
The following properties can be configured:

| **Option** | **Description** |
| --- | --- |
| `state` | Your state you wish to view |
| `location` | Basically is your city, Please refer D.O.E Malaysia |
| `refreshTime` | Refresh time every (*default : 5 minutes*) |
