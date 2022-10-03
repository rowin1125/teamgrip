import { FindClubById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_CLUB_MUTATION = gql`
  mutation DeleteClubMutation($id: String!) {
    deleteClub(id: $id) {
      id
    }
  }
`

// const formatEnum = (values: string | string[] | null | undefined) => {
//   if (values) {
//     if (Array.isArray(values)) {
//       const humanizedValues = values.map((value) => humanize(value))
//       return humanizedValues.join(', ')
//     } else {
//       return humanize(values as string)
//     }
//   }
// }

// const jsonDisplay = (obj) => {
//   return (
//     <pre>
//       <code>{JSON.stringify(obj, null, 2)}</code>
//     </pre>
//   )
// }

const timeTag = (datetime: string | undefined) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

// const checkboxInputTag = (checked) => {
//   return <input type="checkbox" checked={checked} disabled />
// }

const Club = ({ club }: { club: FindClubById['club'] }) => {
  const [deleteClub] = useMutation(DELETE_CLUB_MUTATION, {
    onCompleted: () => {
      toast.success('Club deleted')
      navigate(routes.adminClubs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: string) => {
    if (confirm('Are you sure you want to delete club ' + id + '?')) {
      deleteClub({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Club {club?.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{club?.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(club?.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(club?.updatedAt)}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{club?.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        {club && (
          <>
            <Link
              to={routes.adminEditClub({ id: club.id })}
              className="rw-button rw-button-blue"
            >
              Edit
            </Link>
            <button
              type="button"
              className="rw-button rw-button-red"
              onClick={() => onDeleteClick(club.id)}
            >
              Delete
            </button>
          </>
        )}
      </nav>
    </>
  )
}

export default Club
