import qs from "query-string";

const ServiceBaseUrl = "http://localhost:8082";
// @FIXME: should be pulled from account level
const CompanyId = "comp4";

export const fetchVacancyList = async filters => {
  try {
    const queryParams = stringifyPayload(filters);
    const fullUrl = `${ServiceBaseUrl}/search/vacancies/${CompanyId}${queryParams}`;
    console.log("[API]", fullUrl);

    let response = await fetch(fullUrl);
    response = await response.json();
    return response;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 7,
          list: MockedVacancies,
        });
      }, 300);
    });
  } catch (err) {
    throw err;
  }
};

export const fetchVacancyFacets = async filters => {
  try {
    const queryParams = stringifyPayload(filters);
    const fullUrl = `${ServiceBaseUrl}/search/facets/${CompanyId}${queryParams}`;

    let response = await fetch(fullUrl);
    response = await response.json();
    return response;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          facets: MockedFacets,
        });
      }, 300);
    });
  } catch (err) {
    throw err;
  }
};

const stringifyPayload = (filters, withPrefix = true) => {
  const { offset, limit, query, facets } = filters;
  const payload = {
    offset,
    limit,
    text: query,
    ...facets,
  };
  const stringified = qs.stringify(payload, {
    arrayFormat: "comma",
    skipEmptyString: true,
    skipNull: true,
  });

  return (withPrefix ? "?" : "") + stringified;
};

const MockedFacets = [
  {
    key: "recruiterName",
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
    key: "regionId",
    label: "Regions",
    options: [
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
        key: "620",
        recordCount: 1,
        label: "Germany / North Rhine-Westphalia",
      },
      {
        key: "612",
        recordCount: 1,
        label: "Germany / Bavaria",
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
