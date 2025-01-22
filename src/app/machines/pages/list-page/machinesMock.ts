const machineWithoutRutineData = {
  lastSeason: '2021-01-01',
  weight: { mainWeight: 5, extraWeight: 0 },
  series: 1,
  repetitions: 5,
  restTime: 30,
  feedback: 'Mantener peso',
};

export const machinesMock = [
  {
    id: 1,
    exercise: 'press de pecho',
    image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    machineType: 'black',
    everDone: false,
    machineRutineData: {
      lastSeason: '2021-01-01',
      weight: { mainWeight: 5, extraWeight: 0 },
      series: 1,
      repetitions: 5,
      restTime: 30,
      feedback: 'Mantener peso',
    },
  },
  {
    id: 2,
    exercise: 'remo',
    image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    machineType: 'black',
    everDone: false,
    machineRutineData: {
      lastSeason: '2021-01-01',
      weight: { mainWeight: 5, extraWeight: 0 },
      series: 1,
      repetitions: 5,
      restTime: 30,
      feedback: 'Mantener peso',
    },
  },
  {
    id: 3,
    exercise: 'biceps',
    image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    machineType: 'white',
    everDone: false,
    machineRutineData: {
      lastSeason: '2021-01-01',
      weight: { mainWeight: 1, extraWeight: 0 },
      series: 1,
      repetitions: 5,
      restTime: 30,
      feedback: 'Mantener peso',
    },
  },
];
