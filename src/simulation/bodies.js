export default [
  {
    name: "Sun",
    color: "yellow",
    radius: 696340 / 3, // sun is 1 third size because it's too darn big
    avgDistanceFromParent: 0,
    orbitalPeriod: 0.0,
  },
  {
    name: "Mercury",
    color: "grey",
    radius: 2439,
    avgDistanceFromParent: 46962000,
    orbitalPeriod: 0.241095,
  },
  {
    name: "Venus",
    color: "white",
    radius: 6052,
    avgDistanceFromParent: 108810000,
    orbitalPeriod: 0.616438,
  },
  {
    name: "Earth",
    color: "blue",
    radius: 6371,
    avgDistanceFromParent: 151830000,
    orbitalPeriod: 1.0,
    satellites: [
      {
        name: "Moon",
        color: "white",
        radius: 1737,
        avgDistanceFromParent: 384402,
        orbitalPeriod: 0.074854,
      },
    ],
  },
  {
    name: "Mars",
    color: "red",
    radius: 3390,
    avgDistanceFromParent: 207880000,
    orbitalPeriod: 1.882191,
  },
  {
    name: "Jupiter",
    color: "orange",
    radius: 69911,
    avgDistanceFromParent: 770790000,
    orbitalPeriod: 11.865753,
  },
  {
    name: "Saturn",
    color: "gold",
    radius: 58232,
    avgDistanceFromParent: 1494600000,
    orbitalPeriod: 29.443835,
  },
  {
    name: "Uranus",
    color: "lightblue",
    radius: 25326,
    avgDistanceFromParent: 2960700000,
    orbitalPeriod: 83.805479,
  },
  {
    name: "Neptune",
    color: "mediumblue",
    radius: 24622,
    avgDistanceFromParent: 4476500000,
    orbitalPeriod: 163.835616,
  },
];
