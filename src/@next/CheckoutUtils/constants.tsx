export const CheckoutMetadataTypes = {
  JobTitle: "vacancy_jobTitle",
  JobDescription: "vacancy_description",
  Industry: "vacancy_taxonomy_industry",
  JobFunction: "vacancy_taxonomy_jobCategoryId",
  Seniority: "vacancy_taxonomy_seniority",
  // Seniority: 'vacancy_taxonomy_seniorityId'
  VacancyURL: "vacancy_tracking_vacancy_url",
  ApplicationURL: "vacancy_tracking_applicationUrl",
  ContactName: "contactInfo_name",
  ContactNumber: "contactInfo_phoneNumber",
  // vacancy_organizationName = serializers.CharField(max_length=255, allow_null=False)
  VacancyType: "vacancy_type",
  MinExp: "vacancy_minimumYearsOfExperience",
  EducationLevel: "vacancy_educationLevelId",
  MinWorkingHours: "vacancy_workingHours_minimum",
  MaxWorkingHours: "vacancy_workingHours_maximum",
  SalaryMinAmount: "vacancy_salary_minimumAmount",
  SalaryMaxAmount: "vacancy_salary_maximumAmount",
  SalaryPerPeriod: "vacancy_salary_perPeriod",
  SalaryCurrency: "vacancy_salary_currency",
};
