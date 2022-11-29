export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NoProperty = '/404'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum PropertyType {
  'apartment' = 'Apartment',
  'room' = 'Private Room',
  'house' = 'House',
  'hotel' = 'Hotel'
}

export enum CitiesList {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum SortType {
  Default = 'Default',
  PriceLowToHigh = 'PriceLowToHigh',
  PriceHighToLow = 'PriceHighToLow',
  RatingHighToLow = 'RatingHighToLow'
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments'
}

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
  User = 'USER',
}
