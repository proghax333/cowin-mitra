import { useAppointmentStore } from '../../lib/appointments/AppointmentStore';

export default function CoWINHandler(data) {
  const store = useAppointmentStore('centers');

  const { district_id, sessions } = data;
  if (district_id && sessions) {
    store.update({ district_id, sessions });
  }
}
