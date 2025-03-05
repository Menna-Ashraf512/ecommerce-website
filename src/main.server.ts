import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { initFlowbite } from 'flowbite';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

if (isPlatformBrowser(inject(PLATFORM_ID))) {
    initFlowbite();
  }
