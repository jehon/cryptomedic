pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        sh '''npm ci
&& touch node_modules/.dependencies'''
      }
    }

  }
}