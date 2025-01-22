const machineWitoutRutineData = {
  lastSeason: '2021-01-01',
  weight: { mainWeight: 5, extraWeight: 0 },
  series: 1,
  repetitions: 5,
  restTime: 30,
  feedback: 'bien',
};

export const machinesMock = [
  {
    id: 1,
    exercise: 'press de pecho',
    image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    machineType: 'black',
    everDone: false,
    machineRutineData: {
      machineWitoutRutineData,
    },
  },
  {
    id: 2,
    exercise: 'remo',
    image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    machineType: 'black',
    everDone: false,
    machineRutineData: {
      machineWitoutRutineData,
    },
  },
];
