import React, { Component } from 'react'
import * as THREE from 'three'

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scene: null,
      camera: null,
      renderer: null,
      material: null,
      cube: null,
      frameId: null,
    }
  }

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    const cube = new THREE.Mesh(geometry, material)

    camera.position.z = 4
    scene.add(cube)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    let newState = {scene, camera, renderer, material, cube};

    this.setState(newState, () => {
      this.mount.appendChild(this.state.renderer.domElement)
      this.start()
    });
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.state.frameId) {
      let frameId = requestAnimationFrame(this.animate)
      this.setState({ frameId });
    }
  }

  stop = () => {
    cancelAnimationFrame(this.state.frameId)
  }

  animate = () => {
    let newCube = { ...this.state.cube };
    newCube.rotation.x += 0.01
    newCube.rotation.y += 0.01

    this.setState({ cube: newCube }, )


    this.renderScene()
  }

  renderScene = () => {
    this.state.renderer.render(this.state.scene, this.state.camera);
    let frameId = window.requestAnimationFrame(this.animate)
    this.setState({ frameId });
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Scene
