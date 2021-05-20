pipeline {
  agent any
  environment {
    CRYPTOMEDIC_UPLOAD = credentials('cryptomedic-upload')
    CRYPTOMEDIC_DB_UPGRADE = credentials('cryptomedic-deploy')

    // Need a different port, to allow continue working in dev with normal port
    CRYPTOMEDIC_PORT = "15080"

    // To have the same docker-compose to all, to allow killing previous one
    //   See https://docs.docker.com/compose/reference/envvars/#compose_project_name
    COMPOSE_PROJECT_NAME = "jenkins_cryptomedic"
    VERBOSE = "targets"
    MAKEOPT = "--debug=basic"
  }
  options {
    ansiColor('xterm')
    lock resource: 'port_${CRYPTOMEDIC_PORT}'
    skipStagesAfterUnstable()
    disableConcurrentBuilds()
    timeout(time: 15, unit: 'MINUTES')
  }
  stages {
    stage('setup-computer') {
      steps {
        sh 'make ${MAKEOPT} ${STAGE_NAME}'
      }
    }
    stage('stop previous') {
      steps {
        sh 'make ${MAKEOPT} stop'
        sh 'nc -v -w 1 localhost ${CRYPTOMEDIC_PORT} || true'
      }
    }
    stage('clean') {
      steps {
        sh 'make ${MAKEOPT} ${STAGE_NAME}'
      }
    }
    stage('dump') {
      steps {
        sh 'make ${MAKEOPT} ${STAGE_NAME}'
      }
    }
    stage('start') {
      steps {
        sh 'make ${MAKEOPT} ${STAGE_NAME}'
      }
    }
    stage('dependencies') {
      steps {
        sh '''
npm ci
touch node_modules/.dependencies
make ${MAKEOPT} ${STAGE_NAME}
'''
      }
    }
    stage('build') {
      steps {
        sh 'make ${MAKEOPT} ${STAGE_NAME}'
      }
    }
    stage('test-api') {
      steps {
        sh 'make ${MAKEOPT} ${STAGE_NAME}'
      }
    }
    stage('test-api-bare') {
      steps {
        sh 'make ${MAKEOPT} ${STAGE_NAME}'
      }
    }
    stage('test-unit') {
      steps {
        sh 'make ${MAKEOPT} ${STAGE_NAME}'
      }
    }
    stage('test-e2e') {
      steps {
        sh 'make ${MAKEOPT} ${STAGE_NAME}'
      }
    }
    stage('test-styles') {
      steps {
        sh 'make ${MAKEOPT} ${STAGE_NAME}'
      }
    }
    stage('lint') {
      steps {
        sh 'make ${MAKEOPT} ${STAGE_NAME}'
      }
    }

    stage('deploy-test') {
      when {
        anyOf { branch pattern: "ci/.*", comparator: "REGEXP" }
      }
      steps {
        sh 'make ${MAKEOPT} ${STAGE_NAME}'
      }
    }
    stage('deploy') {
      // options {
      //   lock resource: 'cryptomedic_production'
      // }
      when {
        branch 'main'
      }
      steps {
        lock(resource: 'cryptomedic_production') {
          sh '''
            CRYPTOMEDIC_UPLOAD_USER=$CRYPTOMEDIC_UPLOAD_USR \
              CRYPTOMEDIC_UPLOAD_PASSWORD=$CRYPTOMEDIC_UPLOAD_PSW \
              make ${MAKEOPT} ${STAGE_NAME}
          '''
        }
      }
    }
  }
  post {
    always {
      sh 'make ${MAKEOPT} chmod || true'
      // sh 'make ${MAKEOPT} stop'
      junit 'tmp/js/junit/*.xml'
      junit 'tmp/phpv*/index*.xml'
      junit 'cypress/results/*.xml'
      archiveArtifacts artifacts: 'tests/styles/**/*', allowEmptyArchive: true
      archiveArtifacts artifacts: 'tmp/**/*,tests/cypress/video/**/*,tests/cypress/screenshots/**/*', allowEmptyArchive: true
      // deleteDir() /* clean up our workspace */
    }
  }
}
