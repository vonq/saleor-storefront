import { defineMessages, IntlShape } from "react-intl";

export const commonMessages = defineMessages({
  search: {
    defaultMessage: "search",
  },
  outOfStock: {
    defaultMessage: "Out of stock",
  },
  lowStock: {
    defaultMessage: "Low stock",
  },
  noItemsAvailable: {
    defaultMessage: "No items available",
  },
  noPurchaseAvailable: {
    defaultMessage: "Not available for purchase",
  },
  purchaseAvailableOn: {
    defaultMessage: `Will become available for purchase on {date} at {time}`,
  },
  youMightLike: {
    defaultMessage: "You might like",
  },
  choosePaymentMethod: {
    defaultMessage: "Please choose payment method.",
  },
  provideEmailAddress: {
    defaultMessage: "Please provide email address.",
  },
  account: {
    defaultMessage: "Account",
  },
  myAccount: {
    defaultMessage: "My Account",
  },
  orderHistory: {
    defaultMessage: "Order history",
  },
  addressBook: {
    defaultMessage: "Address book",
  },
  logOut: {
    defaultMessage: "Log Out",
  },
  firstName: {
    defaultMessage: "First Name",
  },
  lastName: {
    defaultMessage: "Last Name",
  },
  password: {
    defaultMessage: "Password",
  },
  quantity: {
    defaultMessage: "Quantity",
  },
  sku: {
    defaultMessage: "SKU",
  },
  maxQtyIs: {
    defaultMessage: "Maximum quantity is {maxQuantity}",
  },
  qty: {
    defaultMessage: "Quantity",
  },
  subtotal: {
    defaultMessage: "Subtotal",
  },
  shipping: {
    defaultMessage: "Shipping",
  },
  promoCode: {
    defaultMessage: "Promo code",
  },
  total: {
    defaultMessage: "Total",
  },
  totalPrice: {
    defaultMessage: "Total Price",
  },
  checkout: {
    defaultMessage: "Checkout",
  },
  eMail: {
    defaultMessage: "Email Address",
  },
  shortEmail: {
    defaultMessage: "Email",
  },
  loading: {
    defaultMessage: "Loading",
  },
  products: {
    defaultMessage: "Products",
  },
  price: {
    defaultMessage: "Price",
  },
  variant: {
    defaultMessage: "Variant",
  },
  phone: {
    defaultMessage: "Phone",
  },
  phoneNumber: {
    defaultMessage: "Phone number: {phone}",
  },
  showEmail: {
    defaultMessage: "Email: {email}",
  },
  save: {
    defaultMessage: "Save",
  },
  add: {
    defaultMessage: "Add",
  },
  filterHeader: {
    defaultMessage: "FILTERS",
  },
  clearFilterHeader: {
    defaultMessage: "CLEAR FILTERS",
  },
  status: {
    defaultMessage: "Status",
  },
  cancel: {
    defaultMessage: "Cancel",
  },
  home: {
    defaultMessage: "Home",
  },
});

export const checkoutMessages = defineMessages({
  stepNameAddress: {
    defaultMessage: "Address",
  },
  stepNameShipping: {
    // defaultMessage: "Shipping",
    defaultMessage: "Address",
  },
  stepNamePayment: {
    defaultMessage: "Payment",
  },
  stepNameReview: {
    defaultMessage: "Review",
  },
  setTargetGroup: {
    defaultMessage: "Save and continue",
  },
  addressNextActionName: {
    // defaultMessage: "Continue to Shipping",
    defaultMessage: "Save and continue",
  },
  shippingNextActionName: {
    defaultMessage: "Save and continue",
  },
  paymentNextActionName: {
    defaultMessage: "Save and continue",
  },
  reviewNextActionName: {
    defaultMessage: "Place order",
  },
  addNewAddress: {
    defaultMessage: "Add new address",
  },
  shippingMethod: {
    defaultMessage: "SHIPPING METHOD",
  },
  billingAddress: {
    defaultMessage: "BILLING ADDRESS",
  },
  paymentMethod: {
    defaultMessage: "PAYMENT METHOD",
  },
  reviewOrder: {
    defaultMessage: "REVIEW ORDER",
  },
  shippingAddress: {
    defaultMessage: "Shipping Address",
  },
  continueShopping: {
    defaultMessage: "CONTINUE SHOPPING",
  },
});

export const prodListHeaderCommonMsg = defineMessages({
  sortOptionsClear: {
    defaultMessage: "Clear...",
  },
  sortOptionsPrice: {
    defaultMessage: "Price Low-High",
  },
  sortOptionsPriceDsc: {
    defaultMessage: "Price High-Low",
  },
  sortOptionsName: {
    defaultMessage: "Name Increasing",
  },
  sortOptionsNameDsc: {
    defaultMessage: "Name Decreasing",
  },
  sortOptionsUpdatedAt: {
    defaultMessage: "Last updated Ascending",
  },
  sortOptionsUpdatedAtDsc: {
    defaultMessage: "Last updated Descending",
  },
});

export const paymentStatusMessages = defineMessages({
  notCharged: {
    defaultMessage: "Not charged",
  },
  partiallyCharged: {
    defaultMessage: "Partially charged",
  },
  fullyCharged: {
    defaultMessage: "Fully charged",
  },
  partiallyRefunded: {
    defaultMessage: "Partially refunded",
  },
  fullyRefunded: {
    defaultMessage: "Fully refunded",
  },
});

export const orderStatusMessages = defineMessages({
  draft: {
    defaultMessage: "Draft",
  },
  unfulfilled: {
    defaultMessage: "Unfulfilled",
  },
  partiallyFulfilled: {
    defaultMessage: "Partially fulfilled",
  },
  fulfilled: {
    defaultMessage: "Fulfilled",
  },
  canceled: {
    defaultMessage: "Canceled",
  },
});

export function translatePaymentStatus(
  status: string,
  intl: IntlShape
): string {
  switch (status) {
    case "Not charged":
      return intl.formatMessage(paymentStatusMessages.notCharged);
    case "Partially charged":
      return intl.formatMessage(paymentStatusMessages.partiallyCharged);
    case "Fully charged":
      return intl.formatMessage(paymentStatusMessages.fullyCharged);
    case "Partially refunded":
      return intl.formatMessage(paymentStatusMessages.partiallyRefunded);
    case "Fully refunded":
      return intl.formatMessage(paymentStatusMessages.fullyRefunded);
    default:
      return status;
  }
}

export function translateOrderStatus(status: string, intl: IntlShape): string {
  switch (status) {
    case "Draft":
      return intl.formatMessage(orderStatusMessages.draft);
    case "Unfulfilled":
      return intl.formatMessage(orderStatusMessages.unfulfilled);
    case "Partially fulfilled":
      return intl.formatMessage(orderStatusMessages.partiallyFulfilled);
    case "Fulfilled":
      return intl.formatMessage(orderStatusMessages.fulfilled);
    case "Canceled":
      return intl.formatMessage(orderStatusMessages.canceled);
    default:
      return status;
  }
}

export const jobAdMessages = defineMessages({
  noBasketProducts: {
    defaultMessage: "No products in the basket",
  },
  createJobAd: {
    defaultMessage: "Create your job ad(s)",
  },
  createJobAdDescription: {
    defaultMessage:
      "Fill in the needed information for your job posting(s). Some fields are required by job boards to be able to post on it.",
  },
  jobTitle: {
    defaultMessage: "Job title",
  },
  jobTitleDescription: {
    defaultMessage:
      "This is the job title which will be shown to your candidates:",
  },
  jobIndustry: {
    defaultMessage: "Industry",
  },
  jobIndustryDescription: {
    defaultMessage: "Please fill in the industry of the job.",
  },
  jobDescription: {
    defaultMessage: "Job description",
  },
  jobDescriptionSummary: {
    defaultMessage: "Choose how you want to fill in your job description.",
  },
  jobDetailPageUrl: {
    defaultMessage: "Link to job detail page",
  },
  jobDetailPageUrlDescription: {
    defaultMessage:
      "Fill in the URL that will be used as the landing page for your job ads.",
  },
  jobApplicationPageUrl: {
    defaultMessage: "Link to application page",
  },
  jobApplicationPageUrlDescription: {
    defaultMessage:
      "Fill in the URL of the page where a candidate fills in the application. Depending on your application process, this can also be the job detail page.",
  },
  jobCriteria: {
    defaultMessage: "Job criteria",
  },
  minEducationLevel: {
    defaultMessage: "Minimum level of education",
  },
  employmentType: {
    defaultMessage: "Employment Type",
  },
  seniority: {
    defaultMessage: "Seniority",
  },
  hoursPerWeek: {
    defaultMessage: "Hours per week",
  },
  minHours: {
    defaultMessage: "Min.",
  },
  maxHours: {
    defaultMessage: "Max.",
  },
  salary: {
    defaultMessage: "Salary (optional)",
  },
  salaryDescription: {
    defaultMessage:
      "Please note: don't use a decimal separator e.g. 3500 instead of 3.500.",
  },
  salaryFrom: {
    defaultMessage: "From",
  },
  salaryTo: {
    defaultMessage: "To",
  },
  currency: {
    defaultMessage: "In the currency",
  },
  period: {
    defaultMessage: "Period",
  },
  jobPostingDetails: {
    defaultMessage: "Job posting details",
  },
  jobFunction: {
    defaultMessage: "Job Function",
  },
});
