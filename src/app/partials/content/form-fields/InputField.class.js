export default class InputField {
    constructor(onChange, type, name, value, className, ariaDescribedby) {
        this.onChange=onChange
        this.type=type
        this.name=name
        this.value=value
        this.className=className
        this.ariaDescribedby=ariaDescribedby
    }
}