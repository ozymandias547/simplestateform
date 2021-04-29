import SimpleStateForm from  '../src/index.js'

describe('SimpleStateForm Initialization', () => {

  describe("when initialized empty", () => {

    it('Then it should succeed', () => {
      const form = SimpleStateForm()
      expect(form).toBeTruthy()
    })

    it('Should export the proper variables', () => {
      const form = SimpleStateForm()
      expect(form.initialValues).toEqual({})
      expect(form.schema).toEqual({})
      expect(form.onInputChange).toBeTruthy()
      expect(form.validate).toBeTruthy()
      expect(form.validateSubmission).toBeTruthy()
    })

  })

  describe('When a schema is passed in without validation or values', () => {

    let form;

    beforeEach(() => {
      form = SimpleStateForm({
        schema: {
          "email": {},
          "password": {}
        }
      })
    })

    it('Schema should be set and available on the form. ', () => {
      expect(form.schema).toEqual({
        "email": {},
        "password": {}
      })
    })

    it('Initial values should be empty strings with no errors', () => {

      expect(form.initialValues).toEqual({
        "email": {
          value: "",
          error: null
        },
        "password": {
          value: "",
          error: null
        }
      })

    })
  })

  describe("When a schema is passed in with initial values", () => {
    describe("And initial values are strings", () => {
      it("Then it should set those as initial values", () => {
        const form = SimpleStateForm({
          schema: {
            email: {
              initial: "testa"
            },
            password: {
              initial: "testb"
            }
          }
        })

        expect(form.initialValues).toEqual({
          email: {
            value: "testa",
            error: null
          },
          password: {
            value: "testb",
            error: null
          }
        })

      })

    })

    describe("And initial values are functions", () => {
      it("Then it should set those as initial values", () => {
        const form = SimpleStateForm({
          schema: {
            email: {
              initial: () => "testA"
            },
            password: {
              initial: () => "testB"
            }
          }
        })

        expect(form.initialValues).toEqual({
          email: {
            value: "testA",
            error: null
          },
          password: {
            value: "testB",
            error: null
          }
        })

      })

    })
  })
});
