export type CodeName = {
  code: string | null;
  name: string | null;
};

export type BusinessGroup = {
  identifier: string;
  name: string;
};

export type Supplementary = {
  employee_number: string;
};

export type PersonalDetails = {
  identifier: string;
  user_id: string;
  title_code: string;
  title: string;
  preferred_forename: string | null;
  preferred_surname: string | null;
  forename: string;
  middle_names: string[];
  surname: string;
  full_name: string;
  date_of_birth: string;
  working_hours: number;
  date_of_joining: string;
  position: string;
  ucl_email: string;
  personal_email: string;
  ni_number: string;
  supplementary: Supplementary;
  business_group: BusinessGroup;
  gender: CodeName;
  marital_status: CodeName;
  ethnic_origin: CodeName;
  primary_nationality: CodeName;
  secondary_nationality: CodeName;
  object_version_number: number;
};

export type PersonResponse = {
  personal_details: PersonalDetails;
};
