SimpleStateForm
===========================
Library for creating easy simple forms in React.

#### Basic Usage

```
import SimpleStateFrom from 'SimpleStateForm'

export default Form {

    constructor(props) {
        super(props)

        this.form = SimpleStateForm({
            component: this,
            schema: {
                email: {
                    initial: "",
                    validate: (value) => {
                        if (value.length === 0) return "Email is required"
                    }
                }
            }
        })

        this.state = {
            ...this.form.initialValues
        }

    }

}
```
