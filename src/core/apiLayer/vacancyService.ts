// const BASE_URL = "https://example.com/";

// export const fetchVacancies = async ({ offset, limit, ...filters }) => {
export const fetchVacancies = async () => {
  try {
    // const URL = `${BASE_URL}/vacancies?`;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          totalHits: 7,
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

const MockedFacets = [
  {
    key: "contactNames",
    label: "Recruiters",
    options: [
      {
        key: "John Brandon",
        recordCount: 3,
      },
      {
        key: "Kate Morgan",
        recordCount: 3,
      },
      {
        key: "Katie Taylor",
        recordCount: 1,
      },
    ],
  },
  {
    key: "regions",
    label: "Regions",
    list: [
      {
        key: "341",
        recordCount: 2,
        label: "Netherlands",
      },
      {
        key: "342",
        recordCount: 1,
        label: "Europe",
      },
      {
        key: "405",
        recordCount: 1,
        label: "Germany",
      },
      {
        key: "425",
        recordCount: 1,
        label: "United Kingdom",
      },
      {
        key: "612",
        recordCount: 1,
        label: "Germany / Bavaria",
      },
      {
        key: "620",
        recordCount: 1,
        label: "Germany / North Rhine-Westphalia",
      },
    ],
  },
];

const MockedVacancies = [
  {
    vacancy_id: "1762e004-50da-4db6-9f4d-000000000000",
    source_name: "Acme",
    title: "PHP Developer",
    contact_details: {
      name: "Katie Taylor",
      phonenumber: "111-22222-3333",
    },
    created_at: "2020-09-02T00:00:00+00:00",
    region_id: "425", // United Kingdom
  },
  {
    vacancy_id: "3c36e88b-6a48-4c70-b573-000000000000",
    source_name: "Acme",
    title: "Account Manager",
    contact_details: {
      name: "Kate Morgan",
      phonenumber: "111-22222-3333",
    },
    created_at: "2020-09-02T00:00:00+00:00",
    region_id: "405", // Germany
  },
  {
    vacancy_id: "6ac7ab99-f14c-4974-8a0e-000000000000",
    source_name: "Acme",
    title: "Software Developer C# (m/w/d)",
    contact_details: {
      name: "John Brandon",
      phonenumber: "111-22222-3333",
    },
    created_at: "2020-09-01T00:00:00+00:00",
    region_id: "612", // Germany / Bavaria
  },
  {
    vacancy_id: "21ad81e9-9b34-4361-a532-000000000000",
    source_name: "Acme",
    title: "E-Commerce Marketing Manager",
    contact_details: {
      name: "Kate Morgan",
      phonenumber: "111-22222-3333",
    },
    created_at: "2020-09-01T00:00:00+00:00",
    region_id: "620", // Germany / North Rhine-Westphalia
  },
  {
    vacancy_id: "8fd6b10e-a9b2-497e-8298-000000000000",
    source_name: "Acme",
    title: "Consultant Informatiebeveiliging",
    contact_details: {
      name: "John Brandon",
      phonenumber: "111-22222-3333",
    },
    created_at: "2020-09-01T00:00:00+00:00",
    region_id: "341", // Netherlands
  },
  {
    vacancy_id: "86440a05-4623-4350-8ea6-000000000000",
    source_name: "Acme",
    title: "Nurse",
    contact_details: {
      name: "John Brandon",
      phonenumber: "111-22222-3333",
    },
    created_at: "2020-09-01T00:00:00+00:00",
    region_id: "341", // Netherlands
  },
  {
    vacancy_id: "3fa7ab38-1173-46e0-95f5-000000000000",
    source_name: "Acme",
    title: "Senior Energy Engineer",
    contact_details: {
      name: "Kate Morgan",
      phonenumber: "111-22222-3333",
    },
    created_at: "2020-09-01T00:00:00+00:00",
    region_id: "342", // Europe
  },
];
