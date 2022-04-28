export interface FirstVisitModalProps {
    imageDesktop: string;
    imageMobile: string;
    text: string;
    title: string;
    buttonText: string;
}
  
export interface RequestData {
    entity: string;
    field: string;
    searchField: string;
    hasPostMethod: boolean;
    data?: any;
}