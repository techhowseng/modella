export type OnToggle = {
   open: boolean,
   toggle: () => void
}

export type Recommendations = {
   id: number;
   firstname: string,
   lastname: string,
   gender?: string,
   state?: string,
   country?: string,
   address?: string,
}

export type TopModels = {
   id: number;
   firstname: string,
   lastname: string,
   gender?: string,
   state?: string,
   country?: string,
   address?: string,
   desc?: string
}