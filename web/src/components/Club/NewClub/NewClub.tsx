import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ClubForm from 'src/components/Club/ClubForm';

export const CREATE_CLUB_MUTATION = gql`
    mutation CreateClubMutation($input: CreateClubInput!) {
        createClub(input: $input) {
            id
            name
        }
    }
`;

const NewClub = () => {
    const [createClub, { loading, error }] = useMutation(CREATE_CLUB_MUTATION, {
        onCompleted: () => {
            toast.success('Club created');
            navigate(routes.adminClubs());
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onSave = (input) => {
        createClub({ variables: { input } });
    };

    return (
        <div className="rw-segment">
            <header className="rw-segment-header">
                <h2 className="rw-heading rw-heading-secondary">New Club</h2>
            </header>
            <div className="rw-segment-main">
                <ClubForm onSave={onSave} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default NewClub;
