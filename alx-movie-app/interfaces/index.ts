export interface ComponentProps{
    children: React.ReactNode;
}

export interface ButtonProps{
    title: string;
    action?: () => void;
}