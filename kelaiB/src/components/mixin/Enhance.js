/**
 * Created by luojie on 2017/9/12.
 */
import { Dialog } from './Dialog.js';
import { Network } from './Network.js';

export default function(comp) {
	comp = Network(comp);
	comp = Dialog(comp);
	return comp;
};