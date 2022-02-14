export interface Course {
    courseId: string,
    displayTitle: string,
    modules: Module[]

};

export interface Module {
    moduleId: string,
    displayTitle: string,
    boards: { [key: string]: string },
    icon: string,
};