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

export class AnimationType {
  initial() {}
  animate() {}
}
