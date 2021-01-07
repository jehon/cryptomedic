pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        sh '''npm ci
&& touch node_modules/.dependencies'''
      }
    }

    stage('test') {
      steps {
        sh 'make test'
      }
    }

    stage('lint') {
      steps {
        sh 'make lint'
      }
    }

  }
}