import { useCoWINApi } from '../CoWINDataAPI/CoWINDataAPI';
import { startPolling } from './Poller';

export class CoWINPollingService {
  constructor() {
    this.api = useCoWINApi();
  }
  initialize() {
    console.log("LOG: Initializing polling service...");
    this.api.loadData();
  }
  start() {
    this.api.on('load', () => {
      console.log("LOG: Started polling service!");
      startPolling(this.api);
    })
  }
}

export const PollingService = new CoWINPollingService();
