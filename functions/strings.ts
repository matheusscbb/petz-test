export const breadcrumbTitleAdjustment = (title: string) => title.replaceAll("-", " ");

export const hourStringAdjust = (date: string) => {
    const dateSplited = date.split(':');

    return `${dateSplited[0]}h${dateSplited[1]}m`
};
