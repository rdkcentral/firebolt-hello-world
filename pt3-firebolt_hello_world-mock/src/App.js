/*
* Copyright 2021 Comcast Cable Communications Management, LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* SPDX-License-Identifier: Apache-2.0
*/

import { Lightning, Utils, Log } from '@lightningjs/sdk';
import { Lifecycle, Device } from '@firebolt-js/sdk';

const  LifecycleColors = ({
	// BLUE
	BOOT: '0xff0000ff',
	// RED
	INACTIVE: '0xffff0000',
	// ORANGE
	BACKGROUND: '0xffE69738',
	// GREEN
	FOREGROUND: '0xff00aa00'
});

export class App extends Lightning.Component {
	static getFonts() {
		return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }];
	}

	static _template() {
		return {
			HelloWorld: {
				w: 1920,
				h: 1080,
				rect: true,
				color: LifecycleColors.BOOT,
				FireboltStatus: {  
					Lifecycle: { mountX:0.5, x: 960, y: 400, text: { text: 'Lifecycle not Ready!', fontFace: 'Regular', fontSize: 50 }},
					Device: { mountX:0.5, x: 960, y: 480, text: { text: 'Device not Ready!', fontFace: 'Regular', fontSize: 35 }},
				},
				Complete: { 
					visible:false, mountX:0.5, x: 960, y: 250,
					text: { text: 'Firebolt >> Hello World', fontFace: 'Regular', fontSize: 90 },
				}, 
			},
		};
	}

	_init() {
	}

	_active() {
		Device.distributor()
			.then(distributor => {
				const deviceDistributor = 'distributor:' + distributor;
				Log.info(deviceDistributor);
				this.tag('Device').text.text = deviceDistributor + ' :: '; 
			});

		Device.model()
			.then(model => {
				const deviceModel = 'model:' + model;
				Log.info(deviceModel);
				this.tag('Device').text.text += deviceModel + ' :: '; 
			});
    
		Device.platform()
			.then(platform => {
				const devicePlatform = 'platform:' + platform;
				Log.info(devicePlatform);
				this.tag('Device').text.text += devicePlatform + ' :: '; 
			});

		Device.version()
			.then(version => {
				const deviceVersion = 'version:' + version.sdk.readable + ' : v' + version.sdk.major + '.' + version.sdk.minor + '.' + version.sdk.patch;
				Log.info(deviceVersion);
				this.tag('Device').text.text += deviceVersion; 
			});  

		this._registerLifecycleCallbacks();
		Lifecycle.ready();
		Log.info('Lifecycle ready!');
	}

	_registerLifecycleCallbacks() {
		Lifecycle.listen((event, value) => {
			Log.info('Lifecycle.listen:', event, value);

			if (value.state) {
				Log.warn('Lifecycle: >> : previous state :' + value.previous, value);
				Log.warn('Lifecycle: >> : current state :' + value.state, value);
			}

			if (value.state == 'foreground') {
				Log.info('Lifecycle : Foreground State', null);
				this.tag('HelloWorld').color = LifecycleColors.FOREGROUND;
				this.tag('Lifecycle').text.text = 'Lifecycle : Foreground State';
				this.tag('Complete').visible = true;
			}
			if (value.state == 'inactive') {
				Log.info('Lifecycle : Inactive State', null);
				this.tag('HelloWorld').color = LifecycleColors.INACTIVE;
				this.tag('Lifecycle').text.text = 'Lifecycle : Inactive State';
			}
			if (value.state == 'background') {
				Log.info('Lifecycle : Background State', null);
				this.tag('HelloWorld').color = LifecycleColors.BACKGROUND;
				this.tag('Lifecycle').text.text = 'Lifecycle : Background State';
			}
		});
	}
}
