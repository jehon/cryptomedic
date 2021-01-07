pipeline {
  agent any
  stages {
    stage('dependencies') {
      steps {
        sh '''set -e
npm ci
touch node_modules/.dependencies

make dependencies'''
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