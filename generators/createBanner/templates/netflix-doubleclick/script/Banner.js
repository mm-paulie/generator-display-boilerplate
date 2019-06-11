import Entity from '@mediamonks/temple/Entity';

import EventDispatcherComponent from '@mediamonks/temple/component/EventDispatcherComponent';
import MonetPlatformComponent from '@mediamonks/temple/component/platform/MonetPlatformComponent';
import DoubleClickPlatformComponent from '@mediamonks/temple/component/platform/DoubleClickPlatformComponent';
import ConfigComponent from '@mediamonks/temple/component/ConfigComponent';
import fitText from '@mediamonks/temple/util/fitText';

import '@netflixadseng/pk-component-utils';
import '@netflixadseng/wc-monet-integrator';
import '@netflixadseng/wc-netflix-fonts';
import '@netflixadseng/wc-netflix-text';
import '@netflixadseng/wc-netflix-flushed-ribbon';
import '@netflixadseng/wc-netflix-video';
import '@netflixadseng/wc-netflix-img';
import '@netflixadseng/wc-netflix-brand-logo';
import '@netflixadseng/wc-netflix-cta';
import '@netflixadseng/wc-netflix-preloader';

import Animation from './Animation';

export default class Banner extends Entity {
  constructor(config) {
    super();

    this.addComponent(new ConfigComponent(config));
    this.addComponent(new DoubleClickPlatformComponent());
    this.addComponent(new MonetPlatformComponent());
    this.addComponent(new EventDispatcherComponent());
  }

  /**
   *
   * @return {Promise<void>}
   */
  async init() {
    await super.init();

    this.domMainExit = document.body.querySelector('.mainExit');
    this.domnNetflixCta = document.body.querySelector('netflix-cta');

    fitText([document.body.querySelector('.pedigree span'), document.body.querySelector('.tuneIn span')]);

    this.domMainExit.addEventListener('click', this.handleClick);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    this.animation = new Animation(document.querySelector('.banner'));
  }

  exit = () => {
    Enabler.exit('Default Exit');
    // window.open(this.clickTag, '_blank')
  };

  /**
   *
   */
  handleClick = () => {
    this.animation.gotoEnd();
    this.exit();
  };

  /**
   * When mouse rolls over unit.
   */
  handleRollOver = () => {
    this.domnNetflixCta.mouseover();
  };

  /**
   * When mouse rolls out unit.
   */
  handleRollOut = () => {
    this.domnNetflixCta.mouseout();
  };

  /**
   *
   * @return {Promise<void>}
   */
  async start() {
    await this.init();

    if (this.getComponent(MonetPlatformComponent).getData('Toggle_Supercut')) {
      await this.animation.enableSuperCut();
    }

    await this.animation.play();
  }
}
