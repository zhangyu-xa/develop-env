import * as utils from './utils';
for (const util in utils) {
	window[util] = utils[util];
}

import dict from './dict';
window.Dict = dict;