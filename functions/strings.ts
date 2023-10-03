export const breadcrumbTitleAdjustment = (title: string) => title.replaceAll("-", " ");

export const hourStringAdjust = (date: string) => {
    const dateSplited = date.split(':');

    // add regex to make a complete validade
    if (dateSplited.length !== 2) return "";

    return `${dateSplited[0]}h${dateSplited[1]}m`
};
