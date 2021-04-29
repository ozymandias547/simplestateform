import SimpleStateForm from  '../src/index.js'
import MockComponent from "./mocks/MockComponent";
import MockEvent from './mocks/MockEvent'

describe('SimpleStateForm Validation', () => {
  describe("When a form is initialized with validation and invalidated values", () => {
    it("Then it should NOT show errors in initialState since it can't be async", () => {

      const form = SimpleStateForm({
        schema: {
          password: "",
          validate: (value) => {
            if (value.length == 0) return "Password is required";
          }
        }
      })
      expect(form.initialValues.password.error).toBeNull()

    })
  })

  describe("When a form is initialized with validation and invalidated values", () => {
    describe("And validate is run", () => {
      it("Then it SHOULD show errors in initialState", async () => {

        const form = SimpleStateForm({
          component: new MockComponent(),
          schema: {
            password: {
              validate: (value) => {
                if (value.length == 0) return "Password is required";
              },
              initial: ""
            },
          }
        })

        const newValues = await form.validate()

        expect(newValues.password.error).toEqual("Password is required")

      })
    })

  })

  describe("When the onInputChange event is received", () => {
    it("Then it should perform validation", async () => {

      var mockComponent = new MockComponent();

      const form = SimpleStateForm({
        component: mockComponent,
        schema: {
          password: {
            validate: (value) => {
              if (value.length == 0) return "Password is required";
            },
            initial: ""
          },
        }
      })

      await form.onInputChange(MockEvent("input", "password", "hi there"))
      expect(mockComponent.state.values.password.value).toEqual("hi there")

    })
  })

});
