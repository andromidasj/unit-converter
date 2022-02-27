const allUnits = {
  length: {
    measure_unit: 'millimeter',
    subtype: {
      mile: 1609344.01,
      foot: 304.8,
      inch: 25.4,
      meter: 1000,
      centimeter: 10,
      millimeter: 1,
    },
  },
  weight: {
    measure_unit: 'milligram',
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
    subtype: {       // NOT a linear calculation. Gotta figure out another way.
      celsius: 1,    // 274.15,
      kelvin: 1,     // 1,
      fahrenheit: 1, // 255.92777778,
    },
  }
}