import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Addon = {
  __typename?: 'Addon';
  _id: Scalars['String']['output'];
  description: Scalars['String']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  options?: Maybe<Array<Option>>;
  quantityMaximum: Scalars['Int']['output'];
  quantityMinimum: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type AddonIn = {
  _id?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  quantityMaximum?: InputMaybe<Scalars['Int']['input']>;
  quantityMinimum?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type AddonInput = {
  addons?: InputMaybe<Array<InputMaybe<AddonIn>>>;
  restaurant?: InputMaybe<Scalars['String']['input']>;
};

export type AddonOption = {
  __typename?: 'AddonOption';
  addon: Addon;
  addonId: Scalars['String']['output'];
  option: Option;
  optionId: Scalars['String']['output'];
};

export type AddonOutput = {
  __typename?: 'AddonOutput';
  _id?: Maybe<Scalars['String']['output']>;
  addons?: Maybe<Array<Maybe<Addon>>>;
};

export type Address = {
  __typename?: 'Address';
  _id?: Maybe<Scalars['ID']['output']>;
  delivery_address?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  selected?: Maybe<Scalars['Boolean']['output']>;
};

export type Admin = {
  __typename?: 'Admin';
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  restaurants?: Maybe<Array<Maybe<Restaurant>>>;
  token?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  userType?: Maybe<Role>;
};

export type Category = {
  __typename?: 'Category';
  _id?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  foods?: Maybe<Array<Maybe<Food>>>;
  img_menu?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type CategoryInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  img_menu?: InputMaybe<Scalars['String']['input']>;
  restaurant?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryOutput = {
  __typename?: 'CategoryOutput';
  _id?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Maybe<Category>>>;
};

export type Configuration = {
  __typename?: 'Configuration';
  _id?: Maybe<Scalars['String']['output']>;
  androidClientID?: Maybe<Scalars['String']['output']>;
  appAmplitudeApiKey?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  currencySymbol?: Maybe<Scalars['String']['output']>;
  customerAppSentryUrl?: Maybe<Scalars['String']['output']>;
  deliveryRate?: Maybe<Scalars['String']['output']>;
  expoClientID?: Maybe<Scalars['String']['output']>;
  googleApiKey?: Maybe<Scalars['String']['output']>;
  iOSClientID?: Maybe<Scalars['String']['output']>;
  privacyPolicy?: Maybe<Scalars['String']['output']>;
  termsAndConditions?: Maybe<Scalars['String']['output']>;
  testOtp?: Maybe<Scalars['String']['output']>;
  twilioEnabled?: Maybe<Scalars['String']['output']>;
};

export type Coordinate = {
  __typename?: 'Coordinate';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

export type CreateOptionInput = {
  options?: InputMaybe<Array<InputMaybe<OptionInput>>>;
  restaurant?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteFoodOutput = {
  __typename?: 'DeleteFoodOutput';
  _id: Scalars['String']['output'];
};

export type Food = {
  __typename?: 'Food';
  _id?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Category>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  variations?: Maybe<Array<Maybe<Variation>>>;
};

export type FoodInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  restaurant: Scalars['String']['input'];
  stock?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  variations?: InputMaybe<Array<InputMaybe<VariationInput>>>;
};

export type Item = {
  __typename?: 'Item';
  _id?: Maybe<Scalars['String']['output']>;
  addons?: Maybe<Array<Maybe<Addon>>>;
  food?: Maybe<Food>;
  quantity?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  variation?: Maybe<Variation>;
};

export type Location = {
  __typename?: 'Location';
  coordinates?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin?: Maybe<Admin>;
  createAddons?: Maybe<AddonOutput>;
  createAdmin?: Maybe<Admin>;
  createCategory?: Maybe<CategoryOutput>;
  createFood?: Maybe<CategoryOutput>;
  createOptions?: Maybe<OptionOutput>;
  createRestaurant?: Maybe<RestaurantForAdmin>;
  createSection?: Maybe<Array<Maybe<Section>>>;
  createUser?: Maybe<User>;
  createVendor?: Maybe<Vendor>;
  deleteFood?: Maybe<DeleteFoodOutput>;
  emailExist?: Maybe<UserEmailCheckOutput>;
  login?: Maybe<User>;
  ownerLogin?: Maybe<Admin>;
};


export type MutationAdminLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateAddonsArgs = {
  addonInput?: InputMaybe<AddonInput>;
};


export type MutationCreateAdminArgs = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notificationToken?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateCategoryArgs = {
  category?: InputMaybe<CategoryInput>;
};


export type MutationCreateFoodArgs = {
  foodInput?: InputMaybe<FoodInput>;
};


export type MutationCreateOptionsArgs = {
  optionInput?: InputMaybe<CreateOptionInput>;
};


export type MutationCreateRestaurantArgs = {
  owner?: InputMaybe<Scalars['ID']['input']>;
  restaurant?: InputMaybe<RestaurantInput>;
};


export type MutationCreateSectionArgs = {
  section?: InputMaybe<SectionInput>;
};


export type MutationCreateUserArgs = {
  appleId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  facebookId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notificationToken?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateVendorArgs = {
  vendorInput?: InputMaybe<VendorInput>;
};


export type MutationDeleteFoodArgs = {
  id: Scalars['String']['input'];
};


export type MutationEmailExistArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  appleId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  facebookId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notificationToken?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationOwnerLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type NearbyRestaurants = {
  __typename?: 'NearbyRestaurants';
  offers?: Maybe<Array<Maybe<Offer>>>;
  restaurants?: Maybe<Array<Maybe<RestaurantForCustomer>>>;
  sections?: Maybe<Array<Maybe<Section>>>;
};

export type Offer = {
  __typename?: 'Offer';
  _id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  restaurants?: Maybe<Array<Maybe<Restaurant>>>;
  tag?: Maybe<Scalars['String']['output']>;
};

export type OpeningTime = {
  __typename?: 'OpeningTime';
  day?: Maybe<Scalars['String']['output']>;
  times?: Maybe<Array<Maybe<RestaurantTime>>>;
};

export type Option = {
  __typename?: 'Option';
  _id: Scalars['String']['output'];
  addons?: Maybe<Array<Addon>>;
  description: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type OptionInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type OptionOutput = {
  __typename?: 'OptionOutput';
  _id?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<Option>>>;
};

export type Order = {
  __typename?: 'Order';
  _id?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  delivery_address?: Maybe<Address>;
  delivery_charges?: Maybe<Scalars['Float']['output']>;
  items?: Maybe<Array<Maybe<Item>>>;
  orderAmount?: Maybe<Scalars['Float']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  orderStatus?: Maybe<Scalars['String']['output']>;
  paidAmount?: Maybe<Scalars['Float']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  paymentStatus?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  review?: Maybe<Review>;
  rider?: Maybe<Rider>;
  status?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type OrderAddonInput = {
  _id: Scalars['String']['input'];
  options?: InputMaybe<Array<OrderOptionInput>>;
};

export type OrderInput = {
  addons?: InputMaybe<Array<OrderAddonInput>>;
  food: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  specialInstructions?: InputMaybe<Scalars['String']['input']>;
  variation: Scalars['String']['input'];
};

export type OrderOptionInput = {
  _id: Scalars['String']['input'];
};

export type Owner = {
  __typename?: 'Owner';
  _id?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  userType?: Maybe<Role>;
};

export type Query = {
  __typename?: 'Query';
  addons?: Maybe<Array<Maybe<Addon>>>;
  allAddons?: Maybe<Array<Maybe<Addon>>>;
  allCategories?: Maybe<Array<Maybe<Category>>>;
  allOptions?: Maybe<Array<Maybe<Option>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  configuration?: Maybe<Configuration>;
  foods?: Maybe<Array<Maybe<Food>>>;
  nearByRestaurants?: Maybe<NearbyRestaurants>;
  options?: Maybe<Array<Maybe<Option>>>;
  profile?: Maybe<User>;
  restaurant?: Maybe<RestaurantForCustomer>;
  restaurantByOwner?: Maybe<RestaurantForOwner>;
  restaurantList?: Maybe<Array<Maybe<RestaurantForAdmin>>>;
  restaurants?: Maybe<Array<Maybe<RestaurantForAdmin>>>;
  reviews?: Maybe<Array<Maybe<ReviewOutput>>>;
  sections?: Maybe<Array<Maybe<Section>>>;
  vendors?: Maybe<Array<Maybe<Vendor>>>;
};


export type QueryAllAddonsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAllCategoriesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAllOptionsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFoodsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNearByRestaurantsArgs = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryRestaurantArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRestaurantByOwnerArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryReviewsArgs = {
  restaurant?: InputMaybe<Scalars['String']['input']>;
};

export type Restaurant = RestaurantBase & {
  __typename?: 'Restaurant';
  _id?: Maybe<Scalars['String']['output']>;
  addons?: Maybe<Array<Maybe<Addon>>>;
  address?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Maybe<Category>>>;
  deliveryTime?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  minimumOrder?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<Option>>>;
  orderId?: Maybe<Scalars['String']['output']>;
  orderPrefix?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  zone?: Maybe<Zone>;
};

export type RestaurantBase = {
  _id?: Maybe<Scalars['String']['output']>;
  addons?: Maybe<Array<Maybe<Addon>>>;
  address?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Maybe<Category>>>;
  deliveryTime?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  minimumOrder?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<Option>>>;
  orderId?: Maybe<Scalars['String']['output']>;
  orderPrefix?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  zone?: Maybe<Zone>;
};

export type RestaurantDetails = RestaurantBase & {
  __typename?: 'RestaurantDetails';
  _id?: Maybe<Scalars['String']['output']>;
  addons?: Maybe<Array<Maybe<Addon>>>;
  address?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Maybe<Category>>>;
  deliveryTime?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  minimumOrder?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<Option>>>;
  orderId?: Maybe<Scalars['String']['output']>;
  orderPrefix?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  tax?: Maybe<Scalars['Float']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  zone?: Maybe<Zone>;
};

export type RestaurantForAdmin = RestaurantBase & {
  __typename?: 'RestaurantForAdmin';
  _id?: Maybe<Scalars['String']['output']>;
  addons?: Maybe<Array<Maybe<Addon>>>;
  address?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Maybe<Category>>>;
  commissionRate?: Maybe<Scalars['Float']['output']>;
  deliveryTime?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Location>;
  minimumOrder?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<Option>>>;
  orderId?: Maybe<Scalars['String']['output']>;
  orderPrefix?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Owner>;
  password?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  tax?: Maybe<Scalars['Float']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  zone?: Maybe<Zone>;
};

export type RestaurantForCustomer = RestaurantBase & {
  __typename?: 'RestaurantForCustomer';
  _id?: Maybe<Scalars['String']['output']>;
  addons?: Maybe<Array<Maybe<Addon>>>;
  address?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Maybe<Category>>>;
  deliveryTime?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isAvailable?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Location>;
  minimumOrder?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  openingTimes?: Maybe<Array<Maybe<OpeningTime>>>;
  options?: Maybe<Array<Maybe<Option>>>;
  orderId?: Maybe<Scalars['String']['output']>;
  orderPrefix?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  reviewData?: Maybe<ReviewData>;
  slug?: Maybe<Scalars['String']['output']>;
  tax?: Maybe<Scalars['Float']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  zone?: Maybe<Zone>;
};

export type RestaurantForOwner = {
  __typename?: 'RestaurantForOwner';
  _id?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  restaurants?: Maybe<Array<Maybe<Restaurant>>>;
  userType?: Maybe<Role>;
};

export type RestaurantInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  deliveryTime?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  minimumOrder?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type RestaurantListFragment = {
  __typename?: 'RestaurantListFragment';
  _id: Scalars['String']['output'];
  address: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type RestaurantTime = {
  __typename?: 'RestaurantTime';
  endTime?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  startTime?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};

export type Review = {
  __typename?: 'Review';
  _id?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  rating?: Maybe<Scalars['Float']['output']>;
};

export type ReviewData = {
  __typename?: 'ReviewData';
  ratings?: Maybe<Scalars['Int']['output']>;
  reviews?: Maybe<Array<Maybe<Review>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type ReviewOutput = {
  __typename?: 'ReviewOutput';
  _id?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  rating?: Maybe<Scalars['Float']['output']>;
  restaurant?: Maybe<Restaurant>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Rider = {
  __typename?: 'Rider';
  available?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export enum Role {
  Admin = 'ADMIN',
  Vendor = 'VENDOR'
}

export type Section = {
  __typename?: 'Section';
  _id?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  restaurants?: Maybe<Array<Maybe<RestaurantForCustomer>>>;
};

export type SectionInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  enabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  restaurants?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']['output']>;
  addresses?: Maybe<Array<Maybe<Address>>>;
  email?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isNewUser?: Maybe<Scalars['Boolean']['output']>;
  is_offer_notification?: Maybe<Scalars['Boolean']['output']>;
  is_order_notification?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notificationToken?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  tokenExpiration?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserEmailCheckOutput = {
  __typename?: 'UserEmailCheckOutput';
  _id?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  userType?: Maybe<Scalars['String']['output']>;
};

export enum UserTypeEnum {
  Customer = 'CUSTOMER',
  Rider = 'RIDER'
}

export type Variation = {
  __typename?: 'Variation';
  _id?: Maybe<Scalars['String']['output']>;
  addons?: Maybe<Array<Maybe<Addon>>>;
  discounted?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type VariationInput = {
  addons?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  discounted?: InputMaybe<Scalars['Float']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Vendor = {
  __typename?: 'Vendor';
  _id?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  restaurants?: Maybe<Array<Maybe<Restaurant>>>;
  userType?: Maybe<Role>;
};

export type VendorInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Zone = {
  __typename?: 'Zone';
  _id?: Maybe<Scalars['String']['output']>;
  tax?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CreateUserMutationVariables = Exact<{
  phone?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', userId?: string | null, token?: string | null, tokenExpiration?: number | null, name?: string | null, email?: string | null, phone?: string | null } | null };

export type LoginMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  appleId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notificationToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', userId?: string | null, token?: string | null, tokenExpiration?: number | null, isActive?: boolean | null, name?: string | null, email?: string | null, phone?: string | null, isNewUser?: boolean | null } | null };

export type RestaurantFragmentFragment = { __typename?: 'RestaurantForCustomer', _id?: string | null, orderId?: string | null, orderPrefix?: string | null, name?: string | null, image?: string | null, address?: string | null, deliveryTime?: number | null, minimumOrder?: number | null, tax?: number | null, rating?: number | null, isAvailable?: boolean | null, location?: { __typename?: 'Location', coordinates?: Array<number | null> | null } | null, reviewData?: { __typename?: 'ReviewData', total?: number | null, ratings?: number | null, reviews?: Array<{ __typename?: 'Review', _id?: string | null, rating?: number | null, description?: string | null, createdAt?: string | null, order?: { __typename?: 'Order', user?: { __typename?: 'User', _id?: string | null, name?: string | null, email?: string | null } | null } | null } | null> | null } | null, categories?: Array<{ __typename?: 'Category', _id?: string | null, title?: string | null, foods?: Array<{ __typename?: 'Food', _id?: string | null, title?: string | null, image?: string | null, description?: string | null, variations?: Array<{ __typename?: 'Variation', _id?: string | null, title?: string | null, price?: number | null, discounted?: number | null, addons?: Array<{ __typename?: 'Addon', _id: string } | null> | null } | null> | null } | null> | null } | null> | null, options?: Array<{ __typename?: 'Option', _id: string, title: string, description: string, price: number } | null> | null, addons?: Array<{ __typename?: 'Addon', _id: string, title: string, description: string, quantityMinimum: number, quantityMaximum: number, options?: Array<{ __typename?: 'Option', _id: string }> | null } | null> | null, openingTimes?: Array<{ __typename?: 'OpeningTime', day?: string | null, times?: Array<{ __typename?: 'RestaurantTime', startTime?: Array<number | null> | null, endTime?: Array<number | null> | null } | null> | null } | null> | null };

export type RestaurantQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type RestaurantQuery = { __typename?: 'Query', restaurant?: { __typename?: 'RestaurantForCustomer', _id?: string | null, orderId?: string | null, orderPrefix?: string | null, name?: string | null, image?: string | null, address?: string | null, deliveryTime?: number | null, minimumOrder?: number | null, tax?: number | null, rating?: number | null, isAvailable?: boolean | null, location?: { __typename?: 'Location', coordinates?: Array<number | null> | null } | null, reviewData?: { __typename?: 'ReviewData', total?: number | null, ratings?: number | null, reviews?: Array<{ __typename?: 'Review', _id?: string | null, rating?: number | null, description?: string | null, createdAt?: string | null, order?: { __typename?: 'Order', user?: { __typename?: 'User', _id?: string | null, name?: string | null, email?: string | null } | null } | null } | null> | null } | null, categories?: Array<{ __typename?: 'Category', _id?: string | null, title?: string | null, foods?: Array<{ __typename?: 'Food', _id?: string | null, title?: string | null, image?: string | null, description?: string | null, variations?: Array<{ __typename?: 'Variation', _id?: string | null, title?: string | null, price?: number | null, discounted?: number | null, addons?: Array<{ __typename?: 'Addon', _id: string, title: string, description: string, quantityMinimum: number, quantityMaximum: number, options?: Array<{ __typename?: 'Option', _id: string, title: string, description: string, price: number }> | null } | null> | null } | null> | null } | null> | null } | null> | null, options?: Array<{ __typename?: 'Option', _id: string, title: string, description: string, price: number } | null> | null, addons?: Array<{ __typename?: 'Addon', _id: string, title: string, description: string, quantityMinimum: number, quantityMaximum: number, options?: Array<{ __typename?: 'Option', _id: string }> | null } | null> | null, zone?: { __typename?: 'Zone', _id?: string | null, title?: string | null, tax?: number | null } | null, openingTimes?: Array<{ __typename?: 'OpeningTime', day?: string | null, times?: Array<{ __typename?: 'RestaurantTime', startTime?: Array<number | null> | null, endTime?: Array<number | null> | null } | null> | null } | null> | null } | null };

export type RestaurantsQueryVariables = Exact<{
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
}>;


export type RestaurantsQuery = { __typename?: 'Query', nearByRestaurants?: { __typename?: 'NearbyRestaurants', offers?: Array<{ __typename?: 'Offer', _id?: string | null, name?: string | null, tag?: string | null, restaurants?: Array<{ __typename?: 'Restaurant', _id?: string | null } | null> | null } | null> | null, sections?: Array<{ __typename?: 'Section', _id?: string | null, name?: string | null, restaurants?: Array<{ __typename?: 'RestaurantForCustomer', _id?: string | null, orderId?: string | null, orderPrefix?: string | null, name?: string | null, image?: string | null, address?: string | null, deliveryTime?: number | null, minimumOrder?: number | null, tax?: number | null, rating?: number | null, isAvailable?: boolean | null, location?: { __typename?: 'Location', coordinates?: Array<number | null> | null } | null, reviewData?: { __typename?: 'ReviewData', total?: number | null, ratings?: number | null, reviews?: Array<{ __typename?: 'Review', _id?: string | null, rating?: number | null, description?: string | null, createdAt?: string | null, order?: { __typename?: 'Order', user?: { __typename?: 'User', _id?: string | null, name?: string | null, email?: string | null } | null } | null } | null> | null } | null, categories?: Array<{ __typename?: 'Category', _id?: string | null, title?: string | null, foods?: Array<{ __typename?: 'Food', _id?: string | null, title?: string | null, image?: string | null, description?: string | null, variations?: Array<{ __typename?: 'Variation', _id?: string | null, title?: string | null, price?: number | null, discounted?: number | null, addons?: Array<{ __typename?: 'Addon', _id: string } | null> | null } | null> | null } | null> | null } | null> | null, options?: Array<{ __typename?: 'Option', _id: string, title: string, description: string, price: number } | null> | null, addons?: Array<{ __typename?: 'Addon', _id: string, title: string, description: string, quantityMinimum: number, quantityMaximum: number, options?: Array<{ __typename?: 'Option', _id: string }> | null } | null> | null, openingTimes?: Array<{ __typename?: 'OpeningTime', day?: string | null, times?: Array<{ __typename?: 'RestaurantTime', startTime?: Array<number | null> | null, endTime?: Array<number | null> | null } | null> | null } | null> | null } | null> | null } | null> | null, restaurants?: Array<{ __typename?: 'RestaurantForCustomer', _id?: string | null, orderId?: string | null, orderPrefix?: string | null, name?: string | null, image?: string | null, address?: string | null, deliveryTime?: number | null, minimumOrder?: number | null, tax?: number | null, rating?: number | null, isAvailable?: boolean | null, location?: { __typename?: 'Location', coordinates?: Array<number | null> | null } | null, reviewData?: { __typename?: 'ReviewData', total?: number | null, ratings?: number | null, reviews?: Array<{ __typename?: 'Review', _id?: string | null, rating?: number | null, description?: string | null, createdAt?: string | null, order?: { __typename?: 'Order', user?: { __typename?: 'User', _id?: string | null, name?: string | null, email?: string | null } | null } | null } | null> | null } | null, categories?: Array<{ __typename?: 'Category', _id?: string | null, title?: string | null, foods?: Array<{ __typename?: 'Food', _id?: string | null, title?: string | null, image?: string | null, description?: string | null, variations?: Array<{ __typename?: 'Variation', _id?: string | null, title?: string | null, price?: number | null, discounted?: number | null, addons?: Array<{ __typename?: 'Addon', _id: string } | null> | null } | null> | null } | null> | null } | null> | null, options?: Array<{ __typename?: 'Option', _id: string, title: string, description: string, price: number } | null> | null, addons?: Array<{ __typename?: 'Addon', _id: string, title: string, description: string, quantityMinimum: number, quantityMaximum: number, options?: Array<{ __typename?: 'Option', _id: string }> | null } | null> | null, openingTimes?: Array<{ __typename?: 'OpeningTime', day?: string | null, times?: Array<{ __typename?: 'RestaurantTime', startTime?: Array<number | null> | null, endTime?: Array<number | null> | null } | null> | null } | null> | null } | null> | null } | null };

export type ConfigurationQueryVariables = Exact<{ [key: string]: never; }>;


export type ConfigurationQuery = { __typename?: 'Query', configuration?: { __typename?: 'Configuration', _id?: string | null, currency?: string | null, currencySymbol?: string | null, deliveryRate?: string | null, twilioEnabled?: string | null, androidClientID?: string | null, iOSClientID?: string | null, appAmplitudeApiKey?: string | null, googleApiKey?: string | null, expoClientID?: string | null, customerAppSentryUrl?: string | null, termsAndConditions?: string | null, privacyPolicy?: string | null, testOtp?: string | null } | null };

export const RestaurantFragmentFragmentDoc = gql`
    fragment RestaurantFragment on RestaurantForCustomer {
  _id
  orderId
  orderPrefix
  name
  image
  address
  location {
    coordinates
  }
  deliveryTime
  minimumOrder
  tax
  reviewData {
    total
    ratings
    reviews {
      _id
      order {
        user {
          _id
          name
          email
        }
      }
      rating
      description
      createdAt
    }
  }
  categories {
    _id
    title
    foods {
      _id
      title
      image
      description
      variations {
        _id
        title
        price
        discounted
        addons {
          _id
        }
      }
    }
  }
  options {
    _id
    title
    description
    price
  }
  addons {
    _id
    options {
      _id
    }
    title
    description
    quantityMinimum
    quantityMaximum
  }
  rating
  isAvailable
  openingTimes {
    day
    times {
      startTime
      endTime
    }
  }
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($phone: String, $email: String, $password: String, $name: String) {
  createUser(phone: $phone, email: $email, password: $password, name: $name) {
    userId
    token
    tokenExpiration
    name
    email
    phone
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String, $password: String, $type: String!, $appleId: String, $name: String, $notificationToken: String) {
  login(
    email: $email
    password: $password
    type: $type
    appleId: $appleId
    name: $name
    notificationToken: $notificationToken
  ) {
    userId
    token
    tokenExpiration
    isActive
    name
    email
    phone
    isNewUser
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      type: // value for 'type'
 *      appleId: // value for 'appleId'
 *      name: // value for 'name'
 *      notificationToken: // value for 'notificationToken'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RestaurantDocument = gql`
    query Restaurant($id: String) {
  restaurant(id: $id) {
    _id
    orderId
    orderPrefix
    name
    image
    address
    location {
      coordinates
    }
    deliveryTime
    minimumOrder
    tax
    reviewData {
      total
      ratings
      reviews {
        _id
        order {
          user {
            _id
            name
            email
          }
        }
        rating
        description
        createdAt
      }
    }
    categories {
      _id
      title
      foods {
        _id
        title
        image
        description
        variations {
          _id
          title
          price
          discounted
          addons {
            _id
            title
            description
            quantityMinimum
            quantityMaximum
            options {
              _id
              title
              description
              price
            }
          }
        }
      }
    }
    options {
      _id
      title
      description
      price
    }
    addons {
      _id
      options {
        _id
      }
      title
      description
      quantityMinimum
      quantityMaximum
    }
    zone {
      _id
      title
      tax
    }
    rating
    isAvailable
    openingTimes {
      day
      times {
        startTime
        endTime
      }
    }
  }
}
    `;

/**
 * __useRestaurantQuery__
 *
 * To run a query within a React component, call `useRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestaurantQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RestaurantQuery, RestaurantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<RestaurantQuery, RestaurantQueryVariables>(RestaurantDocument, options);
      }
export function useRestaurantLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RestaurantQuery, RestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<RestaurantQuery, RestaurantQueryVariables>(RestaurantDocument, options);
        }
export function useRestaurantSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<RestaurantQuery, RestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<RestaurantQuery, RestaurantQueryVariables>(RestaurantDocument, options);
        }
export type RestaurantQueryHookResult = ReturnType<typeof useRestaurantQuery>;
export type RestaurantLazyQueryHookResult = ReturnType<typeof useRestaurantLazyQuery>;
export type RestaurantSuspenseQueryHookResult = ReturnType<typeof useRestaurantSuspenseQuery>;
export type RestaurantQueryResult = ApolloReactCommon.QueryResult<RestaurantQuery, RestaurantQueryVariables>;
export const RestaurantsDocument = gql`
    query Restaurants($latitude: Float, $longitude: Float) {
  nearByRestaurants(latitude: $latitude, longitude: $longitude) {
    offers {
      _id
      name
      tag
      restaurants {
        _id
      }
    }
    sections {
      _id
      name
      restaurants {
        ...RestaurantFragment
      }
    }
    restaurants {
      _id
      orderId
      orderPrefix
      name
      image
      address
      location {
        coordinates
      }
      deliveryTime
      minimumOrder
      tax
      reviewData {
        total
        ratings
        reviews {
          _id
          order {
            user {
              _id
              name
              email
            }
          }
          rating
          description
          createdAt
        }
      }
      categories {
        _id
        title
        foods {
          _id
          title
          image
          description
          variations {
            _id
            title
            price
            discounted
            addons {
              _id
            }
          }
        }
      }
      options {
        _id
        title
        description
        price
      }
      addons {
        _id
        options {
          _id
        }
        title
        description
        quantityMinimum
        quantityMaximum
      }
      rating
      isAvailable
      openingTimes {
        day
        times {
          startTime
          endTime
        }
      }
    }
  }
}
    ${RestaurantFragmentFragmentDoc}`;

/**
 * __useRestaurantsQuery__
 *
 * To run a query within a React component, call `useRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantsQuery({
 *   variables: {
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useRestaurantsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
      }
export function useRestaurantsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
        }
export function useRestaurantsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
        }
export type RestaurantsQueryHookResult = ReturnType<typeof useRestaurantsQuery>;
export type RestaurantsLazyQueryHookResult = ReturnType<typeof useRestaurantsLazyQuery>;
export type RestaurantsSuspenseQueryHookResult = ReturnType<typeof useRestaurantsSuspenseQuery>;
export type RestaurantsQueryResult = ApolloReactCommon.QueryResult<RestaurantsQuery, RestaurantsQueryVariables>;
export const ConfigurationDocument = gql`
    query Configuration {
  configuration {
    _id
    currency
    currencySymbol
    deliveryRate
    twilioEnabled
    androidClientID
    iOSClientID
    appAmplitudeApiKey
    googleApiKey
    expoClientID
    customerAppSentryUrl
    termsAndConditions
    privacyPolicy
    testOtp
  }
}
    `;

/**
 * __useConfigurationQuery__
 *
 * To run a query within a React component, call `useConfigurationQuery` and pass it any options that fit your needs.
 * When your component renders, `useConfigurationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConfigurationQuery({
 *   variables: {
 *   },
 * });
 */
export function useConfigurationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ConfigurationQuery, ConfigurationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ConfigurationQuery, ConfigurationQueryVariables>(ConfigurationDocument, options);
      }
export function useConfigurationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ConfigurationQuery, ConfigurationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ConfigurationQuery, ConfigurationQueryVariables>(ConfigurationDocument, options);
        }
export function useConfigurationSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ConfigurationQuery, ConfigurationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ConfigurationQuery, ConfigurationQueryVariables>(ConfigurationDocument, options);
        }
export type ConfigurationQueryHookResult = ReturnType<typeof useConfigurationQuery>;
export type ConfigurationLazyQueryHookResult = ReturnType<typeof useConfigurationLazyQuery>;
export type ConfigurationSuspenseQueryHookResult = ReturnType<typeof useConfigurationSuspenseQuery>;
export type ConfigurationQueryResult = ApolloReactCommon.QueryResult<ConfigurationQuery, ConfigurationQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "RestaurantBase": [
      "Restaurant",
      "RestaurantDetails",
      "RestaurantForAdmin",
      "RestaurantForCustomer"
    ]
  }
};
      export default result;
    