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
    image: {
      primary: 'assets/machines/pressPecho.png',
      secondary: 'assets/machines/pressPecho2.png',
    },
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
    image: {
      primary: 'assets/machines/remo.png',
      secondary: 'assets/machines/remo2.png',
    },
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
    image: {
      primary: 'assets/machines/bicepsWhite.png',
      secondary: 'assets/machines/bicepsWhite2.png',
    },
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
