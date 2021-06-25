// const BASE_URL = "https://example.com/";

// export const fetchVacancies = async ({ offset, limit, ...filters }) => {
export const fetchVacancies = async () => {
  try {
    // const URL = `${BASE_URL}/vacancies?`;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 100,
          list: MockedVacancies,
          facets: MockedFacets,
        });
      }, 300);
    });
  } catch (err) {
    // console.error("[Vacancies API]", err);
    // throw err;
  }
};

const MockedFacets = {
  regions: [
    {
      key: "405",
      recordCount: 100,
      label: "Germany",
    },
  ],
  contactNames: [
    {
      key: "Andre Puncken",
      recordCount: 1,
    },
    {
      key: "Andre Puncken",
      recordCount: 1,
    },
    {
      key: "Sarah Hill",
      recordCount: 1,
    },
  ],
};

const MockedVacancies = [
  {
    vacancy_id: "8ac19f31-f06f-4e4d-b150-0a2187f87be6",
    source_name: "Rehau",
    title: "Schnupperpraktikum",
    contact_details: {
      name: "Kerstin\u00a0Barnowsky",
      phonenumber: "030 20264-5223",
    },
    created_at: "2021-06-23T00:00:00+00:00",
    region_id: "405",
  },
  {
    vacancy_id: "8ac19f31-f06f-4e4d-b150-0a2187f87be7",
    source_name: "Rehau",
    title: "Ausbildungsplatz zum Elektroniker für Betriebstechnik (m/w/d) 2021",
    contact_details: {
      name: "Andre Puncken",
      phonenumber: "030 20264-5223",
    },
    created_at: "2021-06-24T00:00:00+00:00",
    region_id: "405",
  },
  {
    vacancy_id: "8ac19f31-f06f-4e4d-b150-0a2187f87be8",
    source_name: "Rehau",
    title: "Ausbildungsplatz zum Verfahrensmechaniker 2021",
    contact_details: {
      name: "Sarah Hill",
      phonenumber: "030 20264-5223",
    },
    created_at: "2021-06-25T00:00:00+00:00",
    region_id: "405",
  },
];
