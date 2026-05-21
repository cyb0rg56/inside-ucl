import type {
  BankDetails,
  ContactDetailsResponse,
  DisabilityDetailsResponse,
  EdiDetailsResponse,
  EducationQualificationsResponse,
  EmergencyContactResponse,
  EmploymentInfoResponse,
  Payslip,
  PersonResponse,
} from '@/types/person';

export type QuickLink = {
  title: string;
  url: string;
};

export const QUICK_LINKS: QuickLink[] = [
  {
    title: "Desk Booking",
    url: "https://app.ucl.ac.uk/InsideUCL/AllDeskBookings"
  },
  {
    title: "Time Off",
    url: "https://app.ucl.ac.uk/InsideUCL/MyTimeOff_v2"
  },
  {
    title: "MyServices",
    url: "https://myservices.ucl.ac.uk/",
  },
  {
    title: "MyCampus Service Request",
    url: "https://www.ucl.ac.uk/estates/mycampus",
  },
  {
    title: "Report an Incident",
    url: "https://www.ucl.ac.uk/staff/task/report-incident",
  },
  {
    title: "IT Help & Support",
    url: "https://www.ucl.ac.uk/isd/help-support",
  },
];

export const BASIC_DETAILS: PersonResponse[] = [
  {
    personal_details: {
      identifier: "NO2UGJR",
      user_id: "xgclsdp",
      title_code: "MR.",
      title: "Mrs",
      preferred_forename: "Melisa",
      preferred_surname: null,
      forename: "Therese",
      middle_names: ["Leonora"],
      surname: "Heaney",
      full_name: "Douglas, Veronica",
      date_of_birth:
        "Sun Aug 04 1985 14:59:53 GMT+0100 (British Summer Time)T00:00:00",
      working_hours: 37.5,
      date_of_joining:
        "Wed Nov 05 2025 04:51:13 GMT+0000 (Greenwich Mean Time)",
      position: "Project Manager",
      ucl_email: "Elmer_Howell18@ucl.ac.uk",
      personal_email: "Moises.Runolfsson-Schmitt@yahoo.com",
      ni_number: "BQ499112N",
      supplementary: {
        employee_number: "1182325",
      },
      business_group: {
        identifier: "8914",
        name: "Research Support",
      },
      gender: {
        code: "X",
        name: "Non-Binary",
      },
      marital_status: {
        code: null,
        name: null,
      },
      ethnic_origin: {
        code: "489",
        name: "Mixed",
      },
      primary_nationality: {
        code: "GB",
        name: "United Kingdom",
      },
      secondary_nationality: {
        code: "IE",
        name: "Germany",
      },
      object_version_number: 0,
    },
  },
];

export const CONTACT_DETAILS: ContactDetailsResponse[] = [
  {
    contact_details: {
      email: "Deontae.Bergnaum@ucl.ac.uk",
      object_version_number: 1,
      address_collection: {
        address: [
          {
            identifier: "ADDR331",
            date_from:
              "Fri Feb 27 2026 20:05:45 GMT+0000 (Greenwich Mean Time)",
            date_to: null,
            is_primary_address: true,
            type: {
              code: "WORK",
              name: "Work",
            },
            line: ["816 Sean Ridge", "Apt 3C"],
            town_or_city: "Leeds",
            county: {
              code: "BLF",
              name: "Glasgow",
            },
            country: {
              code: "GB",
              name: "United Kingdom",
            },
            postcode: "EH1 1YZ",
            object_version_number: 1,
            update_action_code: null,
          },
        ],
      },
      phone_collection: {
        phone: [
          {
            identifier: "PHONE401",
            date_from:
              "Wed Feb 05 2025 22:11:09 GMT+0000 (Greenwich Mean Time)",
            date_to: null,
            type: {
              code: "WORK",
              name: "Work",
            },
            phone_number: "+447768375200",
            object_version_number: 1,
            update_action_code: null,
          },
        ],
      },
    },
  },
];

export const DISABILITY_DETAILS: DisabilityDetailsResponse[] = [
  {
    disability_details: [
      {
        disability_id: "44817",
        person_id: "sc3l1db",
        last_updated: "21/05/2024",
        effective_date: "12/12/2023",
        effective_end_date: null,
        disability_category_code: "P",
        registration_date: "01/11/2023",
        registration_exp_date: null,
        assessment_due_date: null,
        description: null,
        degree: null,
        quota_fte: "1",
        status_code: "A",
        reason_code: "39",
        business_group_id: null,
        object_version_number: "1",
      },
    ],
  },
];

export const EDI_DETAILS: EdiDetailsResponse[] = [
  {
    edi: {
      pei_information_category: "UCL_DIVERSITY",
      religion: {
        code: "897",
        name: "Muslim",
      },
      sexual_orientation: {
        code: "242",
        name: "Heterosexual",
      },
      gender_code: "Other",
      same_gender_at_birth_code: "Yes",
      gender_description: null,
      edi_id: 378354,
      last_updated: "03/03/2026 14:45:00",
      object_version_number: "1",
    },
  },
];

export const EDUCATION_QUALIFICATIONS: EducationQualificationsResponse[] = [
  {
    pagination: {
      limit: 200,
      offset: 0,
      count: 1,
    },
    education_and_qualifications_collection: {
      education_and_qualifications: [
        {
          person_id: "212405",
          last_updated:
            "Sat Feb 21 2026 02:01:55 GMT+0000 (Greenwich Mean Time)",
          name: "Professional Qualification",
          title: "Computer Science",
          start_date: null,
          end_date: "2025-09-30",
          grade_attained: "C",
          awarding_body: "University College, London",
          qualification_letters: "MA",
          qualification_type_id: 5,
          status: "PASS",
          establishment: "Main Campus",
          qualification_subject_collection: {
            qualification_subject: [
              {
                subject_code: "P742",
                start_date: "1951-01-01",
                end_date: null,
                major_flag: null,
                grade_attained: null,
                subjects_taken_id: "141833",
                subject_status_code: "COMPLETE",
                last_updated:
                  "Fri Oct 31 2025 03:06:58 GMT+0000 (Greenwich Mean Time)",
                subject: "Astrophysics",
                object_version_number: 1,
              },
            ],
          },
          qualification_id: 436858,
          object_version_number: 3,
        },
      ],
    },
  },
];

export const EMERGENCY_CONTACTS: EmergencyContactResponse[] = [
  {
    emergency_contact_collection: {
      emergency_contact: [
        {
          business_group_id: "5980",
          is_primary_contact: false,
          title_code: "MRS.",
          title: "Ms",
          full_name: "Lesch, Walker",
          first_name: "Kendrick",
          middle_names: null,
          last_name: "Paucek",
          relationship_code: "F",
          relationship: "Friend",
          email_address: "Eloise.Berge94@gmail.com",
          employee_flag: false,
          personal_relationship_flag: false,
          shared_residence_flag: true,
          con_relationship_id: "400229",
          is_emergency_contact: true,
          orig_person_id: "584363",
          con_person_id: "347616",
          con_obj_ver_number: 1,
          con_last_update_date:
            "Wed Feb 11 2026 21:48:47 GMT+0000 (Greenwich Mean Time)",
          rel_obj_ver_number: 1,
          rel_last_update_date:
            "Tue Feb 10 2026 05:10:13 GMT+0000 (Greenwich Mean Time)",
          address: {
            address_type_code: "PHCA",
            address_line_1: "Apt. 549",
            address_line_2: "123 Purdy Passage",
            address_line_3: "Floor 1",
            town_or_city: "Bristol",
            county_code: "MAN",
            postcode: "BT1 5GS",
            country_code: "GB",
            last_updated:
              "Thu Apr 09 2026 04:12:47 GMT+0100 (British Summer Time)",
            address_id: "906292",
            primary_flag: false,
            object_version_number: 1,
          },
          phone_collection: {
            phone: [
              {
                phone_type_code: "M1",
                phone_number: "0396303664",
                phone_number_id: "997505",
                phone_is_editable: true,
                last_updated:
                  "Mon Feb 02 2026 05:05:32 GMT+0000 (Greenwich Mean Time)",
                object_version_number: 1,
              },
            ],
          },
        },
      ],
    },
  },
];

export const BANK_DETAILS: BankDetails[] = [
  {
    assignment: {
      identifier: "03652",
      number: "882",
      position: "Officer",
    },
    personal_payment_method_id: "PPM953",
    org_payment_method_name: "CYYA",
    bank_code: "NTWT",
    bank_name: "TUBN Bank plc",
    bank_branch: "Cardiff",
    sort_code: "25-60-45",
    account_number: "20468541",
    account_name: "F Bernier",
    bldng_soc_ac_no: "",
    priority: 2,
    amount: "3",
    percentage: "622",
    object_version_number: 9,
  },
];

export const CONTRACT_DETAILS: EmploymentInfoResponse[] = [
  {
    employment_info_collection: {
      employment_info: [
        {
          assignment_number: "0182353",
          effective_start_date: "01/03/2025",
          effective_end_date: null,
          last_update_date: "20/03/2025 14:15:00",
          primary: true,
          grade: null,
          position: "Operations.Test Organisation.100002",
          job_title: "Administrator",
          department_name: "Professional Services",
          location: "UCL - Roberts Building , Second Floor , 210",
          employment_category: "Full Time",
          work_hours: "36.5",
          frequency: "Week",
          work_pattern: "0-7-7-7-7-7-0",
          assignment_status: "Suspended Assignment",
          change_reason: "Change in Hours",
          line_manager_name: "Romaguera, Mr Renee",
          date_of_joining: "15/01/2025",
          business_group: "UCL Business Group",
          deprived_locale: "LONDON, GB",
          people_group: "NHS..UK",
          payroll: "UCL",
          object_version_number: "1",
          sort_order: "1",
        },
      ],
    },
  },
];

export const PAYSLIP_DETAILS: Payslip[] = [
  {
    person_id: "031112",
    employee_details: {
      employee_name: "Dr. Lorraine Boehm",
      employee_number: "8951591",
      ni_number: "JS702158U",
      department: "Finance",
      payroll_name: "UCL",
      email: "Zelma76@yahoo.com",
      first_name: "Arlie",
    },
    employee_address: {
      address_type: "Employee Address",
      address_line1: "3768 Christelle Hollow",
      address_line2: "Suite 3",
      address_line3: null,
      town_or_city: null,
      county: null,
      post_code: "SW1A 1AA",
      country: "United Kingdom",
    },
    employee_pay_proc_info: {
      period_type: "Calendar Month",
      period_num: 8,
      payment_month: "March 2025",
      start_date: "2025-02-01",
      end_date: "2025-04-30",
      payment_date: "2025-04-30",
    },
    employee_tax_details: {
      tax_code: "7083",
      tax_basis: "Cumulative",
      ni_category: "X",
      paye_ref: "JCD/RG",
    },
    employee_payment_summary: {
      total_payments_value: 3564.033319906596,
      total_deductions_value: 512.4594786391092,
      total_amount_paid_value: 2942.8912940184155,
    },
    employee_earnings_both: [
      {
        assignment_id: "852680",
        assignment_number: "0943839",
        element_name: "Allowance",
        pay_value: 3127.6260761919884,
        salary: 89199.24648428784,
        fte: "0.6",
        count_both_elements: 3,
      },
    ],
    employee_deductions: [
      {
        element_name: "Deduction 1",
        element_value: 34.638961071953545,
      },
    ],
    employee_additional_payments: [],
    employee_net_pay_distribution: {
      sort_code: "65****",
      account_number: "****4663",
      net_pay: 2630.4782115704274,
      org_payment_method_name: "BACS",
      bank_name: "HSBC",
    },
    employee_pay_balances: [
      {
        balance_name: "Taxable Pay",
        pay_value: 21110.60112767098,
      },
    ],
    tax_office_details: {
      organization_id: "8361",
      business_group_id: "0147",
      statutory_name: "University College London",
      statutory_address: "Gower Street, London WC1E 6BT",
      employer_accounts_off_ref: "951PS00164652",
      tax_office_phone: null,
      employer_code: null,
      reporting_country: "UK",
      reporting_country_desc: "United Kingdom",
      employer_reference_cms_deo: null,
    },
    payslip_messages: {
      standard_message:
        "If you have a query please direct this to our first line support team via telephone on 0203 108 7160 or raise a request at myservices.ucl.ac.uk",
      payslip_message: "\n\n",
    },
  },
];
