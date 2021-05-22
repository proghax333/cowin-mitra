import { useCoWINApi } from '../CoWINDataAPI/CoWINDataAPI';
import { useWebhookStore } from '../../lib/webhooks/WebhookStore';
import { useAppointmentStore } from '../../lib/appointments/AppointmentStore';

export class PollingService {
  constructor(callback = () => {}, interval = 5000) {
    this.handle = null;
    this.callback = callback;
    this.interval = interval;
  }
  setCallback(callback) {
    this.callback = callback;
  }
  setIntervalTime(interval) {
    this.interval = interval;
  }
  async startPolling() {
    if (this.handle === null) {
      this.handle = setInterval(this.callback, this.interval);
      return true;
    }
    return false;
  }
  stopPolling() {
    if (this.handle !== null) {
      clearInterval(this.handle);
      this.handle = null;
      return true;
    }
    return false;
  }

  async restartPolling() {
    this.stopPolling();
    this.startPolling();
  }
}

export class CoWINPollingService extends PollingService {
  constructor() {
    super();
    this.api = useCoWINApi();
  }

  initialize() {
    console.log('LOG: Initializing CoWIN polling service...');
    this.api.loadData();

    const webhookStore = useWebhookStore();
    const appointmentStore = useAppointmentStore('polling');

    // Set callback
    this.setCallback(async () => {
      async () => {
        const allDistricts = webhookStore.getDistricts();
        for (const district_id of allDistricts) {
          const appointments = await api.getAppointmentByDistrict(
            district_id,
            '23-05-2021'
          );
          if (!appointments || !appointments['sessions']) {
            console.error(`Error at district_id: ${district_id}`);
            continue;
          }
          appointmentStore.update({
            district_id,
            sessions: appointments['sessions'],
          });
        }
      };
    });

    this.api.on('load', () => {
      console.log('LOG: Started polling service!');
      this.startPolling();
    });
  }
}

export const CoWINApiPoller = new CoWINPollingService();
