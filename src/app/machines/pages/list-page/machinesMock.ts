const machineWithoutRutineData = {
  lastSeason: '2021-01-01',
  weight: { mainWeight: 5, extraWeight: 0 },
  series: 1,
  repetitions: 15,
  restTime: 30,
  feedback: 'Mantener peso',
};

export const machinesMock = [
  {
    id: 1,
    exercise: 'press de pecho',
    image: 'assets/machines/pressPecho.png',
    machineType: 'black',
    everDone: false,
    machineRutineData: {
      lastSeason: '2021-01-01',
      weight: { mainWeight: 5, extraWeight: 0 },
      series: 1,
      repetitions: 15,
      restTime: 30,
      feedback: 'Mantener peso',
    },
  },
  {
    id: 2,
    exercise: 'remo',
    image: 'assets/machines/remo.png',
    machineType: 'black',
    everDone: false,
    machineRutineData: {
      lastSeason: '2021-01-01',
      weight: { mainWeight: 5, extraWeight: 0 },
      series: 1,
      repetitions: 15,
      restTime: 30,
      feedback: 'Mantener peso',
    },
  },
  {
    id: 3,
    exercise: 'biceps',
    image: 'assets/machines/bicepsWhite.png',
    machineType: 'white',
    everDone: false,
    machineRutineData: {
      lastSeason: '2021-01-01',
      weight: { mainWeight: 1, extraWeight: 0 },
      series: 1,
      repetitions: 15,
      restTime: 30,
      feedback: 'Mantener peso',
    },
  },
];
