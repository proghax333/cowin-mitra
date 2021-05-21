
import { useWebhookStore } from '../../lib/webhooks/WebhookStore';
import { useAppointmentStore } from '../../lib/appointments/AppointmentStore';

export async function startPolling(api)
{
  const store = useWebhookStore();
  const appointmentStore = useAppointmentStore('polling');

  let handle = setInterval(async () => {
    const all = store.all();
    for(const district_id of Object.keys(all))
    {
      const hooks = all[district_id];
      const appointments = await api.getAppointmentByDistrict(district_id, "21-05-2021");

      if(!appointments || !appointments["sessions"])
      {
        console.error(`Error at district_id: ${district_id}`);
        continue;
      }

      const changes = appointmentStore.update(
        {
          district_id,
          sessions: appointments["sessions"]
        }
      )
      
      for(const hook of hooks)
      {
        hook && hook.send(changes);
      }
    }
  }, 5000);
}
