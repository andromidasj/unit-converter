const allUnits = {
  length: {
    measure_unit: 'millimeter',
    icon: 'fa-solid fa-ruler-combined',
    subtype: {
      mile: 1609344.01,
      /**
       *  How can we make sure that mixing units doesn't cause rounding errors?
       *  i.e.: 20 miles calculates as 105600.001 feet, because we're converting
       *  to millimeters and then to feet. I can obviously put the exact conversion
       *  for each and every other unit in this object, but I'm wondering if there's
       *  a shorter way. Maybe not if accuracy is the biggest need.
       *
       * mile: {
       *  foot: 5280
       *  inch: 63360
       *  kilometer: 1.609344
       *  meter: 1609.344
       * }
       *  foot: {
       *  mile: 1/5280
       * }
       *
       *  Or maybe just make two subtypes: metric & imperial. There can be a conversion
       *  between the two, but within the subtypes they can have the exact value.
       *  e.g. subtype:  imperial,  {measure_unit: inch {foot: 12, mile: 63360}}
       *       subtype:    metric,  {measure_unit: millimeter {meter: 1000, kilometer: 1000000}}
       */

      foot: 304.8,
      inch: 25.4,
      kilometer: 1000000,
      meter: 1000,
      centimeter: 10,
      millimeter: 1,
    },
  },
  weight: {
    measure_unit: 'milligram',
    icon: 'fa-solid fa-weight-hanging',
    subtype: {
      pound: 453592,
      ounce: 28349.5,
      'metric ton': 1000000000,
      kilogram: 1000000,
      gram: 1000,
      milligram: 1,
    },
  },
  time: {
    measure_unit: 'millisecond',
    icon: 'fa-solid fa-stopwatch',
    subtype: {
      second: 1000,
      millisecond: 1,
      microsecond: 0.001,
      minute: 60000,
      hour: 3600000,
      day: 86400000,
      week: 604800000,
      year: 31557600000,
    },
  },
  temperature: {
    measure_unit: 'kelvin',
    icon: 'fa-solid fa-temperature-half',
    subtype: {       // NOT a linear calculation. (0 != 0) Gotta figure out another way.
      celsius: 1,    // 274.15,
      kelvin: 1,     // 1,
      fahrenheit: 1, // 255.92777778,
    },
  }
}