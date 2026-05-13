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

export type Address = {
  identifier: string;
  date_from: string;
  date_to: string | null;
  is_primary_address: boolean;
  type: CodeName;
  line: string[];
  town_or_city: string;
  county: CodeName;
  country: CodeName;
  postcode: string;
  object_version_number: number;
  update_action_code: string | null;
};

export type Phone = {
  identifier: string;
  date_from: string;
  date_to: string | null;
  type: CodeName;
  phone_number: string;
  object_version_number: number;
  update_action_code: string | null;
};

export type ContactDetails = {
  email: string;
  object_version_number: number;
  address_collection: {
    address: Address[];
  };
  phone_collection: {
    phone: Phone[];
  };
};

export type PersonResponse = {
  personal_details: PersonalDetails;
};

export type ContactDetailsResponse = {
  contact_details: ContactDetails;
};

export type DisabilityDetail = {
  disability_id: string;
  person_id: string;
  last_updated: string | null;
  effective_date: string | null;
  effective_end_date: string | null;
  disability_category_code: string | null;
  registration_date: string | null;
  registration_exp_date: string | null;
  assessment_due_date: string | null;
  description: string | null;
  degree: string | null;
  quota_fte: string | null;
  status_code: string | null;
  reason_code: string | null;
  business_group_id: string | null;
  object_version_number: string;
};

export type DisabilityDetailsResponse = {
  disability_details: DisabilityDetail[];
};

export type EdiDetails = {
  pei_information_category: string | null;
  religion: CodeName;
  sexual_orientation: CodeName;
  gender_code: string | null;
  same_gender_at_birth_code: string | null;
  gender_description: string | null;
  edi_id: number;
  last_updated: string | null;
  object_version_number: string;
};

export type EdiDetailsResponse = {
  edi: EdiDetails;
};

export type QualificationSubject = {
  subject_code: string;
  start_date: string | null;
  end_date: string | null;
  major_flag: string | null;
  grade_attained: string | null;
  subjects_taken_id: string;
  subject_status_code: string | null;
  last_updated: string | null;
  subject: string;
  object_version_number: number;
};

export type EducationQualification = {
  person_id: string;
  last_updated: string | null;
  name: string | null;
  title: string | null;
  start_date: string | null;
  end_date: string | null;
  grade_attained: string | null;
  awarding_body: string | null;
  qualification_letters: string | null;
  qualification_type_id: number | null;
  status: string | null;
  establishment: string | null;
  qualification_subject_collection: {
    qualification_subject: QualificationSubject[];
  };
  qualification_id: number;
  object_version_number: number;
};

export type EducationQualificationsResponse = {
  pagination: {
    limit: number;
    offset: number;
    count: number;
  };
  education_and_qualifications_collection: {
    education_and_qualifications: EducationQualification[];
  };
};

export type EmergencyContactAddress = {
  address_type_code: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  address_line_3: string | null;
  town_or_city: string | null;
  county_code: string | null;
  postcode: string | null;
  country_code: string | null;
  last_updated: string | null;
  address_id: string;
  primary_flag: boolean;
  object_version_number: number;
};

export type EmergencyContactPhone = {
  phone_type_code: string | null;
  phone_number: string | null;
  phone_number_id: string;
  phone_is_editable: boolean;
  last_updated: string | null;
  object_version_number: number;
};

export type EmergencyContact = {
  business_group_id: string | null;
  is_primary_contact: boolean;
  title_code: string | null;
  title: string | null;
  full_name: string | null;
  first_name: string | null;
  middle_names: string | null;
  last_name: string | null;
  relationship_code: string | null;
  relationship: string | null;
  email_address: string | null;
  employee_flag: boolean;
  personal_relationship_flag: boolean;
  shared_residence_flag: boolean;
  con_relationship_id: string;
  is_emergency_contact: boolean;
  orig_person_id: string;
  con_person_id: string;
  con_obj_ver_number: number;
  con_last_update_date: string | null;
  rel_obj_ver_number: number;
  rel_last_update_date: string | null;
  address: EmergencyContactAddress | null;
  phone_collection: {
    phone: EmergencyContactPhone[];
  };
};

export type EmergencyContactResponse = {
  emergency_contact_collection: {
    emergency_contact: EmergencyContact[];
  };
};

export type BankDetails = {
  assignment: {
    identifier: string;
    number: string;
    position: string;
  };
  personal_payment_method_id: string;
  org_payment_method_name: string;
  bank_code: string;
  bank_name: string;
  bank_branch: string;
  sort_code: string;
  account_number: string;
  account_name: string;
  bldng_soc_ac_no: string;
  priority: number;
  amount: string;
  percentage: string;
  object_version_number: number;
};

export type EmploymentInfo = {
  assignment_number: string;
  effective_start_date: string | null;
  effective_end_date: string | null;
  last_update_date: string | null;
  primary: boolean;
  grade: string | null;
  position: string | null;
  job_title: string | null;
  department_name: string | null;
  location: string | null;
  employment_category: string | null;
  work_hours: string | null;
  frequency: string | null;
  work_pattern: string | null;
  assignment_status: string | null;
  change_reason: string | null;
  line_manager_name: string | null;
  date_of_joining: string | null;
  business_group: string | null;
  deprived_locale: string | null;
  people_group: string | null;
  payroll: string | null;
  object_version_number: string;
  sort_order: string;
};

export type EmploymentInfoResponse = {
  employment_info_collection: {
    employment_info: EmploymentInfo[];
  };
};

export type PayslipEarning = {
  assignment_id: string;
  assignment_number: string;
  element_name: string;
  pay_value: number;
  salary: number;
  fte: string;
  count_both_elements: number;
};

export type PayslipDeduction = {
  element_name: string;
  element_value: number;
};

export type PayslipBalance = {
  balance_name: string;
  pay_value: number;
};

export type Payslip = {
  person_id: string;
  employee_details: {
    employee_name: string;
    employee_number: string;
    ni_number: string;
    department: string;
    payroll_name: string;
    email: string;
    first_name: string;
  };
  employee_address: {
    address_type: string;
    address_line1: string | null;
    address_line2: string | null;
    address_line3: string | null;
    town_or_city: string | null;
    county: string | null;
    post_code: string | null;
    country: string | null;
  };
  employee_pay_proc_info: {
    period_type: string;
    period_num: number;
    payment_month: string;
    start_date: string | null;
    end_date: string | null;
    payment_date: string | null;
  };
  employee_tax_details: {
    tax_code: string;
    tax_basis: string;
    ni_category: string;
    paye_ref: string;
  };
  employee_payment_summary: {
    total_payments_value: number;
    total_deductions_value: number;
    total_amount_paid_value: number;
  };
  employee_earnings_both: PayslipEarning[];
  employee_deductions: PayslipDeduction[];
  employee_additional_payments: PayslipDeduction[];
  employee_net_pay_distribution: {
    sort_code: string;
    account_number: string;
    net_pay: number;
    org_payment_method_name: string;
    bank_name: string;
  };
  employee_pay_balances: PayslipBalance[];
  tax_office_details: {
    organization_id: string;
    business_group_id: string;
    statutory_name: string;
    statutory_address: string;
    employer_accounts_off_ref: string;
    tax_office_phone: string | null;
    employer_code: string | null;
    reporting_country: string;
    reporting_country_desc: string;
    employer_reference_cms_deo: string | null;
  };
  payslip_messages: {
    standard_message: string | null;
    payslip_message: string | null;
  };
};
