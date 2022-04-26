

export const trailToDbFormat = trailArray => {
    let newArray = trailArray.map((element, index) => index % 2 === 0 ? element.name : element.title)
    
    console.log(newArray, newArray.join(";"))

    return newArray.join(";")
}