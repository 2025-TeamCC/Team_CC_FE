import React from "react";
import { Container } from "../../../util/Container";
import PropTypes from "prop-types";
import MemberItem from "./MemberItem";

function MemberMenuPage({ memberList, owner }) {
    return (
        <div>
            <Container>
                {
                    memberList?.map((member, index) => (
                        <MemberItem key={index} member={member} owner={owner} />
                    ))
                }
            </Container>
        </div>
    )
}

MemberMenuPage.propTypes = {
    memberList: PropTypes.array.isRequired,
    owner : PropTypes.bool.isRequired
}
export default MemberMenuPage;