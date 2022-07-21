import { MetaTags, useMutation } from '@redwoodjs/web'
import {
  Form,
  Label,
  Submit,
  SubmitHandler,
  TextAreaField,
  TextField,
  FieldError,
  useForm,
  FormError,
} from '@redwoodjs/forms'
import { Box, Button, FormControl, Input, Textarea } from '@chakra-ui/react'
import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql'
import { toast } from '@redwoodjs/web/toast'

type FormValues = {
  name: string
  email: string
  message: string
}

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()
  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Contact created')
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await create({ variables: { input: data } })
      formMethods.reset()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Box m={4}>
        <Form onSubmit={onSubmit} formMethods={formMethods}>
          <FormError error={error} wrapperClassName="form-error" />

          <FormControl>
            <Label name="name">Name</Label>
            <Input
              as={TextField}
              name="name"
              validation={{
                required: true,
              }}
            />
            <FieldError name="name" className="error" />
          </FormControl>
          <FormControl>
            <Label name="email">Email</Label>
            <Input
              as={TextField}
              name="email"
              validation={{
                required: true,
                pattern: {
                  value: /^[^@]+@[^.]+\..+$/,
                  message: 'Please enter a valid email address',
                },
              }}
            />
            <FieldError name="email" className="error" />
          </FormControl>
          <FormControl>
            <Label name="message">Message</Label>
            <Textarea
              as={TextAreaField}
              name="message"
              validation={{ required: true }}
            />
            <FieldError name="message" className="error" />
          </FormControl>
          <Button
            isLoading={loading}
            isDisabled={loading}
            type="submit"
            as={Submit}
            mt={4}
          >
            Submit
          </Button>
        </Form>
      </Box>
    </>
  )
}

export default ContactPage
