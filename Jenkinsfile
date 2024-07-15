pipeline {
    agent { 
        label 'node14'
    } 
    tools {
        nodejs 'nodejs14'
    }
    stages {
        stage('Install') {
            steps {
                sh '''
                    npm install -f
                '''
            }
        }
        stage('Build') {
            steps {
                 script{
                    def changeLog = getChangedFilesList();
                    def arrayProject = [];
                    changeLog.eachWithIndex { value, index -> 
                        echo "value ${value}"
                        if (value.contains('navigation')) {
                            arrayProject.add('nav');
                       
                        } else if (value.contains('starter')) {
                            arrayProject.add('starter');
                         
                        }
                    };
                    arrayProject.unique();
                     changeLog.eachWithIndex { value, index -> 
                         echo "value ${value}"
                        if (value.contains('navigation')) {
                            sh '''
                                npm run build:nav
                            '''
                        } else if (value.contains('starter')) {
                            sh '''
                                npm run build:starter
                            '''
                        }
                     };
                    echo "changeLog ${changeLog}";
                 }
            }
        }
    }
}
// returns a list of changed files
@NonCPS
String getChangedFilesList() {
    changedFiles = []
    for (changeLogSet in currentBuild.changeSets) {
        for (entry in changeLogSet.getItems()) { // for each commit in the detected changes
            for (file in entry.getAffectedFiles()) {
                changedFiles.add(file.getPath()) // add changed file to list
            }
        }
    }
    return changedFiles
}