export interface FormDataType {
  UserName?: string;
  TwitterProfile?: string;
  EmailAddress?: string;
  NexusType?: string;
}

export interface buttonType {
  title: string;
  icon: React.JSX.Element;
}

export interface CardAnimationType {
  className?: string;
  children: any;
}

export interface CardType {
  children?: any;
  className?: string;
  width?: any;
}

export interface NavigationType {
  name: string;
  link: string;
  icon?: React.JSX.Element;
  current?: boolean;
}
