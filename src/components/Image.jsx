import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const Img = React.createClass({
    mixins: [PureRenderMixin],
    getSrc: function () {
        return this.props.src;
    },
    render: function () {
        return <img src={this.getSrc()}/>;
    }
});

const Video = React.createClass({
    mixins: [PureRenderMixin],
    getSrc: function () {
        return this.props.src;
    },
    render: function () {
        return <video src={this.getSrc()} autoPlay loop/>;
    }
});

export const Image = React.createClass({
    mixins: [PureRenderMixin],
    getSrc: function () {
        return this.props.item.get('src');
    },
    getType: function () {
        const src = this.getSrc();

        if (src.endsWith(".webm") || src.endsWith(".mp4")) {
            return "video";
        }

        return "img";
    },
    render: function () {
        var display;

        if (this.getType() == 'img') {
            display = <Img src={this.getSrc()}/>;
        } else {
            display = <Video src={this.getSrc()}/>;
        }

        return <div className="panel panel-default">
            <div className="panel-body img">
                {display}
            </div>
            <div className="panel-footer">
                <a className="btn btn-xs btn-primary" target="_blank" href={this.getSrc()}>direct image link</a>
            </div>
        </div>;
    }
});
