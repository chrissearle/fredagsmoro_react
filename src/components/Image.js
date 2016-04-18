/* globals CDN_PREFIX */

import React from 'react'
import {Map} from 'immutable'

import {PureRenderComponent} from './PureRenderComponent'

class Img extends PureRenderComponent {
    getSrc() {
        return this.props.src
    }

    render() {
        return <img src={this.getSrc()}/>
    }
}

class Video extends PureRenderComponent {
    getSrc() {
        return this.props.src
    }

    render() {
        return <video src={this.getSrc()} autoPlay loop/>
    }
}

export class Image extends PureRenderComponent {
    getSrc() {
        let prefix = ''

        if (typeof CDN_PREFIX !== 'undefined') {
            prefix = CDN_PREFIX
        }

        return `${prefix}${this.props.item.get('src')}`
    }

    getType() {
        const src = this.getSrc()

        if (src.endsWith('.webm') || src.endsWith('.mp4')) {
            return 'video'
        }

        return 'img'
    }

    render() {
        let display

        if (this.getType() === 'img') {
            display = <Img src={this.getSrc()}/>
        } else {
            display = <Video src={this.getSrc()}/>
        }

        return <div className="panel panel-default">
            <div className="panel-body img">
                {display}
            </div>
            <div className="panel-footer">
                <a className="btn btn-xs btn-primary" target="_blank" href={this.getSrc()}>direct image link</a>
            </div>
        </div>
    }
}

Image.propTypes = {
    item: React.PropTypes.instanceOf(Map).isRequired
}
